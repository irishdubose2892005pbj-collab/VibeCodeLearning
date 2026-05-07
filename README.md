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

## 本地运行
1. 打开 Chrome -> `chrome://extensions/`
2. 打开开发者模式
3. 选择“加载已解压的扩展程序”，指向项目目录

## 功能说明
- 选中翻译：鼠标选中文字后自动调用翻译并在悬浮框展示结果。
- 全页翻译：通过弹窗按钮触发，遍历文本节点并逐个替换为翻译结果。
- API 可切换：通过弹窗保存 provider / key / 目标语言到 `chrome.storage.sync`。

## 安全提示
- 不要把真实 API Key 提交到仓库。
- 当前默认值为 `YOUR_API_KEY`，请在弹窗中配置本地密钥。
