<div align="center">
  <img src="public/assets/logo-white.svg" alt="CKY Logo" width="200"/>

# CKY 门户

[English](README.md) | 简体中文

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

</div>

---

## 目录

- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [内容管理](#内容管理)
- [二次开发](#二次开发)
- [部署](#部署)

---

## 技术栈

| 技术           | 版本 | 用途                           |
| -------------- | ---- | ------------------------------ |
| **Next.js**    | 16.2 | React 框架，静态站点生成 (SSG) |
| **React**      | 19.2 | UI 组件库                      |
| **TypeScript** | 5.x  | 类型系统                       |
| **SCSS**       | 1.99 | 样式预处理器                   |
| **Bootstrap**  | 5.3  | UI 基础框架                    |
| **AOS**        | 2.3  | 滚动动画库                     |
| **Swiper**     | 12.1 | 轮播组件                       |
| **GLightbox**  | 3.3  | 图片灯箱                       |
| **Zod**        | 4.3  | Schema 验证                    |
| **Aliyun OSS** | -    | 静态资源托管                   |

**特性：**

- 静态导出
- i18n 路由
- JSON 数据驱动
- 响应式设计
- SEO 优化

---

## 快速开始

### 环境要求

- Node.js >= 18.x
- pnpm >= 8.x

### 安装

```bash
pnpm install
```

### 开发

```bash
pnpm dev          # http://localhost:3000
```

### 构建

```bash
pnpm build        # 输出到 out/
pnpm preview      # 预览构建结果
```

---

## 项目结构

```text
ckychina-portal/
├── app/
│   ├── [lang]/                    # i18n 路由
│   │   ├── layout.tsx             # 语言级布局（包含 Footer）
│   │   ├── page.tsx               # 首页
│   │   ├── products/              # 产品页
│   │   │   ├── page.tsx           # 产品列表
│   │   │   └── [category]/[id]/   # 产品详情
│   │   ├── privacy/               # 隐私政策
│   │   ├── terms/                 # 服务条款
│   │   └── 404/                   # 404 页面
│   ├── styles/                    # 全局样式
│   │   ├── main.scss              # 入口
│   │   ├── _variables.scss        # CSS 变量
│   │   ├── layouts/               # 布局样式
│   │   ├── sections/              # 各 section 样式
│   │   └── components/            # 组件样式
│   ├── page.tsx                   # 根路径重定向
│   ├── sitemap.ts                 # 动态生成 sitemap.xml
│   └── robots.ts                  # 动态生成 robots.txt
│
├── components/
│   ├── layout/
│   │   ├── header/                # 导航、语言切换
│   │   └── footer/                # 页脚
│   ├── sections/                  # 页面模块
│   │   ├── homepage/
│   │   ├── products/
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── error/
│   ├── ui/                        # 通用组件
│   └── providers/                 # 客户端 Provider
│
├── lib/
│   ├── i18n.ts                    # 国际化工具
│   ├── constants.ts               # 常量定义
│   ├── config.ts                  # 配置
│   ├── utils.ts                   # 工具函数
│   └── models/                    # 数据模型
│       ├── header.ts
│       ├── footer.ts
│       ├── metadata.ts
│       └── pages/                 # 各页面数据构建器
│
├── data/                          # JSON 内容数据
│   ├── languages.json             # 语言配置
│   ├── metadata.json              # 全局 SEO
│   ├── en/                        # 英文内容
│   └── zh/                        # 中文内容
│       └── ...
│
├── public/
│   └── assets/
│       ├── img/                   # 图片资源
│       ├── fonts/                 # 字体文件
│       ├── logo.svg               # Logo（深色）
│       └── logo-white.svg         # Logo（浅色）
│
├── .ossutilconfig                 # OSS 配置（不提交）
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 内容管理

### 数据架构

内容采用 **JSON + TypeScript Schema** 管理：

1. **数据源**：`data/[lang]/` 目录下的 JSON 文件
2. **数据模型**：`lib/models/` 定义了 TypeScript Schema 和构建器
3. **渲染**：通过 `buildXxxData()` 函数加载并验证 JSON，传递给组件

**示例流程：**

```text
data/en/pages/home.json  →  lib/models/pages/home.ts  →  app/[lang]/page.tsx
      ↓ JSON 数据              ↓ buildHomePageData()        ↓ 渲染组件
   { hero: {...} }            验证 & 转换                 <Hero data={...} />
```

### 修改内容

**文本内容：**
直接编辑 `data/[lang]/**/*.json`

**图片资源：**

1. 放置到 `public/assets/img/` 对应目录
2. 在 JSON 中引用路径（如 `/assets/img/hero/01.webp`）

**样式：**
修改 `app/styles/` 下的 SCSS 文件

### 扩展说明

当前架构设计考虑了未来迁移到 CMS 或文档数据库的可能性：

- JSON Schema 可直接映射到 MongoDB/PostgreSQL
- `lib/models/` 的构建器可改为从 API 获取数据
- 保持类型定义不变，仅修改数据源即可

---

## 二次开发

### 添加新页面

1. 创建路由文件：`app/[lang]/new-page/page.tsx`
2. 创建数据文件：`data/en/pages/new-page.json`、`data/zh/pages/new-page.json`
3. 创建数据模型：`lib/models/pages/new-page.ts`
4. 添加样式：`app/styles/sections/_new-page.scss`
5. 更新导航：修改 `data/*/header.json`

### 添加新组件

```tsx
// components/sections/example/feature.tsx
'use client';

import { FeatureData } from '@/lib/models/pages/example';

type Props = {
  data: FeatureData;
};

export default function Feature({ data }: Props) {
  return <section className='feature section'>{/* ... */}</section>;
}
```

### 修改配置

**主题色：**
`app/styles/_variables.scss`

**站点配置：**
`lib/config.ts`

**环境变量：**
创建 `.env.local`

---

## 部署

### 阿里云 OSS

#### 1. 配置 OSS 凭证

```bash
pnpm oss:config
```

输入参数：

- **Endpoint**: `oss-cn-hongkong.aliyuncs.com`
- **AccessKeyId**: `<your-access-key-id>`
- **AccessKeySecret**: `<your-access-key-secret>`

配置保存在 `.ossutilconfig` ，切勿提交到版本控制。

#### 2. 部署

```bash
pnpm deploy
```

等价于：`pnpm build && pnpm oss:sync`

#### 3. 其他命令

```bash
pnpm oss:ls      # 查看 OSS 文件列表
pnpm oss:cp      # 上传文件（保留旧文件）
pnpm oss:sync    # 同步文件（删除远程多余文件）
pnpm oss:rm      # 清空 OSS bucket
```

#### 4. OSS 配置要求

- Bucket：**公共读**
- 开启静态网站托管
- 默认首页：`index.html`
- 默认 404 页：`404.html`
- 可配置 CDN 加速

---

## 开发规范

### Git Hooks

项目使用 Husky + lint-staged 自动化检查：

```bash
git commit
```

### 提交规范

```text
feat: 新功能
fix: 修复 bug
docs: 文档
style: 格式调整
refactor: 重构
perf: 性能优化
chore: 构建/工具
```

---

<div align="center">
  © 2026 CKY. All Rights Reserved.
</div>
