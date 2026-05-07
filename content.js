let bubble;
let hideTimer;
let selectionDebounceTimer;

function ensureBubble() {
  if (bubble) return bubble;

  bubble = document.createElement("div");
  bubble.id = "ai-translator-bubble";
  bubble.style.display = "none";
  document.body.appendChild(bubble);
  return bubble;
}

function hideBubbleLater(delay = 3000) {
  if (!bubble) return;
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    if (bubble) bubble.style.display = "none";
  }, delay);
}

function getSelectedText() {
  return window.getSelection()?.toString().trim() || "";
}

function showBubbleAtSelection(text) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const rect = sel.getRangeAt(0).getBoundingClientRect();
  const el = ensureBubble();

  el.textContent = text;
  el.style.left = `${window.scrollX + rect.left}px`;
  el.style.top = `${window.scrollY + rect.bottom + 8}px`;
  el.style.display = "block";
  hideBubbleLater();
}

async function translateSelection() {
  const text = getSelectedText();
  if (!text) return;

  const res = await chrome.runtime.sendMessage({
    type: "TRANSLATE_TEXT",
    payload: { text }
  });

  if (res?.ok) {
    showBubbleAtSelection(res.translated);
  } else {
    showBubbleAtSelection(`翻译失败: ${res?.error || "未知错误"}`);
  }
}

function isTranslatableNode(node) {
  const parent = node.parentElement;
  if (!parent) return false;
  const tag = parent.tagName;
  if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE"].includes(tag)) {
    return false;
  }
  if (parent.closest("#ai-translator-bubble")) return false;
  return true;
}

function collectTextNodes(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.nodeValue && node.nodeValue.trim() && isTranslatableNode(node)) {
    if (node.nodeValue && node.nodeValue.trim()) {
      nodes.push(node);
    }
  }
  return nodes;
}

async function translateWholePage() {
  const nodes = collectTextNodes();
  for (const node of nodes) {
    const original = node.nodeValue.trim();
    const res = await chrome.runtime.sendMessage({
      type: "TRANSLATE_TEXT",
      payload: { text: original }
    });
    if (res?.ok && res.translated) {
      node.nodeValue = node.nodeValue.replace(original, res.translated);
    }
  }
}

function debounceTranslateSelection() {
  clearTimeout(selectionDebounceTimer);
  selectionDebounceTimer = setTimeout(() => {
    translateSelection();
  }, 250);
}

document.addEventListener("mouseup", () => {
  const selected = getSelectedText();
  if (selected.length > 0) {
    debounceTranslateSelection();
document.addEventListener("mouseup", async () => {
  const selected = getSelectedText();
  if (selected.length > 0) {
    await translateSelection();
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === "HOTKEY_TRANSLATE_SELECTION") {
    translateSelection();
  }

  if (message?.type === "TRANSLATE_WHOLE_PAGE") {
    translateWholePage();
  }
});
