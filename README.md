# 环创工作室 · 智能设备运维平台

基于 Vue 3 + Vue Router + Vite 构建的设备运维前端应用，采用蓝黑色调主题。

## 功能模块

| 模块 | 路由 | 说明 | 对接状态 |
|------|------|------|----------|
| 首页 | `/` | 工作室介绍 + 功能入口 | 前端完成 |
| 设备文档问答 | `/qa` | 基于设备文档的智能问答 | 前端完成，待 AI 端接入问答模型 |
| 工单文本分类 | `/ticket` | 工单文本自动识别故障类型 | 前端完成，待 AI 端接入分类模型 |
| 设备手册查询 | `/manual` | 设备手册检索与详情浏览 | 前端完成，待后端提供手册数据接口 |
| 工作室奖项 | `/awards` | 历年获奖成果展示 | 前端完成 |

## 待对接接口说明

> 以下为前端预留的接口位置，供后端 / 大数据 / AI 端参考对接。

### 1. 设备文档问答 — `src/views/DeviceQA.vue`
- 当前：`answer()` 函数使用内置关键词匹配返回模拟答案
- 待接入：AI 问答模型接口（传入问题，返回答案）
- 建议接口：`POST /api/qa/ask`，请求体 `{ question: string }`，响应 `{ answer: string }`

### 2. 工单文本分类 — `src/views/TicketClassify.vue`
- 当前：`classify()` 函数使用内置关键词匹配，分类结果为模拟数据
- 待接入：AI 文本分类模型接口（传入工单文本，返回分类 + 置信度）
- 建议接口：`POST /api/ticket/classify`，请求体 `{ text: string }`，响应 `{ category, confidence, keywords[] }`

### 3. 设备手册查询 — `src/views/DeviceManual.vue`
- 当前：`manuals` 为内置静态数据
- 待接入：后端手册数据接口（支持关键词搜索）
- 建议接口：`GET /api/manuals?keyword=xxx`，响应 `{ id, name, model, category, sections[] }[]`

## 目录结构

```
src/
├── components/
│   ├── NavBar.vue        # 顶部导航栏（蓝黑毛玻璃风格）
│   └── Background.vue    # 背景动画层（星空 + 漂浮方块 + 发光圆圈）
├── router/
│   └── index.js          # 路由配置
├── views/
│   ├── Home.vue          # 首页
│   ├── DeviceQA.vue      # 设备文档问答
│   ├── TicketClassify.vue# 工单文本分类
│   ├── DeviceManual.vue  # 设备手册查询
│   └── Awards.vue        # 工作室奖项
├── App.vue               # 根组件
├── main.js               # 入口（挂载 router）
└── style.css             # 全局样式（蓝黑主题变量）
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 技术栈

- Vue 3 (`<script setup>` 语法)
- Vue Router 4
- Vite

## 团队协作

- 前端：页面开发与交互实现
- 后端：提供设备手册数据接口
- 大数据：设备文档知识库构建
- AI：问答模型与工单分类模型对接
