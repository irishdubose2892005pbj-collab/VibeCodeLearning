// 翻译配置（默认配置，可被 storage 覆盖）
export const TRANSLATION_API = {
  provider: "DeepL", // 可选: DeepL | GoogleTranslate | Custom
  apiKey: "YOUR_API_KEY",
  targetLang: "zh",
  customEndpoint: "https://myapi.example.com/translate"
};

/**
 * 从 Chrome storage 读取运行时配置。
 * 说明：为了避免把敏感 key 写死在代码里，优先使用用户本地配置。
 */
export async function getRuntimeConfig() {
  const saved = await chrome.storage.sync.get(["translationConfig"]);
  if (saved.translationConfig) {
    return { ...TRANSLATION_API, ...saved.translationConfig };
  }
  return TRANSLATION_API;
}
