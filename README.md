# AI Real-Time Translator

Chrome 扩展：支持网页**选中翻译**与**全页翻译**，可切换翻译 API（DeepL / Google / 自建 API）。

## 项目结构
```text
chrome-ai-translator/
│
├─ manifest.json          # 扩展配置文件
├─ background.js          # 后台脚本，可选，用于持久管理状态
├─ content.js             # 注入网页，抓取文本
├─ agent.js               # 核心 Agent 调用逻辑
├─ config.js              # 翻译 API 配置
├─ popup.html             # 浏览器扩展按钮弹窗 UI
├─ popup.js               # 弹窗逻辑
├─ styles.css             # 样式
└─ README.md              # 项目说明
```

## 已整合能力
- 选中翻译：鼠标选中文字后自动翻译，并在悬浮框显示结果。
- 快捷键翻译：`Ctrl/⌘ + Shift + Y` 翻译当前选中文本。
- 全页翻译：通过弹窗按钮触发，遍历可翻译文本节点并逐个替换。
- API 可切换：通过弹窗保存 provider / key / 目标语言到 `chrome.storage.sync`。

## 自检修复（Bugfix）
- 增加选中翻译防抖（250ms），避免快速连续触发重复请求。
- 翻译悬浮框支持自动隐藏，减少页面遮挡。
- 全页翻译跳过 `script/style/noscript/textarea/code/pre` 等不应翻译的节点，降低破坏页面结构风险。

## 本地运行
1. 打开 Chrome -> `chrome://extensions/`
2. 打开开发者模式
3. 选择“加载已解压的扩展程序”，指向项目目录
4. 在扩展弹窗填入 API 配置后测试选中翻译与全页翻译

## 安全提示
- 不要把真实 API Key 提交到仓库。
- 当前默认值为 `YOUR_API_KEY`，请在弹窗中配置本地密钥。
