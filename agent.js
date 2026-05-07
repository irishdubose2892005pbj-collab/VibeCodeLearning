import { getRuntimeConfig } from "./config.js";

/**
 * Agent Core：统一翻译入口
 * @param {string} text 原文
 * @returns {Promise<string>} 翻译结果
 */
export async function translateText(text) {
  const cfg = await getRuntimeConfig();

  if (!text || !text.trim()) {
    return "";
  }

  if (cfg.provider === "DeepL") {
    const res = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${cfg.apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        text,
        target_lang: cfg.targetLang.toUpperCase()
      })
    });
    const data = await res.json();
    return data?.translations?.[0]?.text || "翻译失败（DeepL 响应异常）";
  }

  if (cfg.provider === "GoogleTranslate") {
    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(cfg.apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, target: cfg.targetLang })
      }
    );
    const data = await res.json();
    return data?.data?.translations?.[0]?.translatedText || "翻译失败（Google 响应异常）";
  }

  const res = await fetch(cfg.customEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, target: cfg.targetLang })
  });
  const data = await res.json();
  return data?.translatedText || "翻译失败（自建 API 响应异常）";
}
