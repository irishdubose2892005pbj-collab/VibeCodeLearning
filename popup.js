import { TRANSLATION_API } from "./config.js";

async function init() {
  const { translationConfig } = await chrome.storage.sync.get(["translationConfig"]);
  const cfg = { ...TRANSLATION_API, ...(translationConfig || {}) };

  document.querySelector("#provider").value = cfg.provider;
  document.querySelector("#apiKey").value = cfg.apiKey === "YOUR_API_KEY" ? "" : cfg.apiKey;
  document.querySelector("#targetLang").value = cfg.targetLang;
}

async function saveConfig() {
  const provider = document.querySelector("#provider").value;
  const apiKey = document.querySelector("#apiKey").value.trim();
  const targetLang = document.querySelector("#targetLang").value.trim();

  await chrome.storage.sync.set({
    translationConfig: {
      provider,
      apiKey,
      targetLang
    }
  });

  window.close();
}

async function translateCurrentPage() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  await chrome.tabs.sendMessage(tab.id, { type: "TRANSLATE_WHOLE_PAGE" });
  window.close();
}

document.querySelector("#save").addEventListener("click", saveConfig);
document.querySelector("#translatePage").addEventListener("click", translateCurrentPage);

init();
