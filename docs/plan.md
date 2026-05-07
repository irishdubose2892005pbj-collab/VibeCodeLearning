# Chrome AI Real-Time Translator 开发里程碑

- 项目周期：2026-05-07 ~ 2026-05-14

## 阶段 0：准备环境（0.5 天）
- 安装 Chrome 开发者模式
- 创建 Codex 项目空间
- 配置翻译 API Key（可切换 DeepL / Google Translate / 自建 API）

## 阶段 1：MVP（2 天）
- Content Script：抓取用户选中文本
- Agent Core：调用翻译 API（`translateText()` 已封装）
- UI：悬浮翻译框显示结果
- 快捷键触发翻译

## 阶段 2：全页翻译 & UI（2 天）
- DOM 文本抓取并分段
- 全页翻译覆盖层
- 语言切换菜单

## 阶段 3：性能优化（1 天）
- 并行翻译任务
- debounce 控制频繁请求
- 翻译历史缓存

## 阶段 4：扩展功能（2 天）
- 自动语言检测
- 动态内容处理（AJAX / SPA）
- 多策略翻译（triage hand-off）

## 阶段 5：测试 & 发布（1 天）
- 单页测试
- 多页/动态内容测试
- 发布到 Chrome Web Store
