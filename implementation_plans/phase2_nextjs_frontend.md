# Phase 2: Next.js 前端开发

## 目标

使用 Next.js 构建支持 SSG/SSR 的多语言企业官网前端。

## 任务清单

### 2.1 初始化 Next.js 项目
- [ ] 创建 Next.js 项目（App Router）
- [ ] 配置 TypeScript
- [ ] 配置 Tailwind CSS

### 2.2 多语言路由配置
- [ ] 配置 i18n 路由 (/zh, /en, /ru)
- [ ] 创建语言切换组件
- [ ] 配置 middleware 处理语言重定向

### 2.3 页面开发

#### 通用组件
- [ ] Header（导航 + 语言切换）
- [ ] Footer
- [ ] SEO Meta 组件
- [ ] Loading 状态组件

#### 页面列表
- [ ] 首页 (/)
- [ ] 公司简介 (/about)
- [ ] 公司动态列表 (/news)
- [ ] 公司动态详情 (/news/[slug])
- [ ] 行业发展 (/industry)
- [ ] 公司产品 (/products)
- [ ] 联系我们 (/contact)

### 2.4 API 对接
- [ ] 创建 Strapi API 客户端
- [ ] 实现数据获取 hooks
- [ ] 配置 ISR (Incremental Static Regeneration)

### 2.5 SEO 配置
- [ ] 动态 meta 标签
- [ ] hreflang 标签
- [ ] sitemap.xml 生成
- [ ] robots.txt

### 2.6 留言表单
- [ ] 表单组件开发
- [ ] 表单验证
- [ ] 提交 API 对接
- [ ] 成功/失败提示

## 目录结构

```
frontend/
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── page.tsx          # 首页
│   │   │   ├── about/
│   │   │   ├── news/
│   │   │   ├── industry/
│   │   │   ├── products/
│   │   │   └── contact/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── ContactForm.tsx
│   ├── lib/
│   │   ├── strapi.ts             # API 客户端
│   │   └── i18n.ts               # 国际化配置
│   └── types/
│       └── strapi.ts             # 类型定义
├── public/
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 执行命令

```bash
# 创建 Next.js 项目
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir

# 进入项目目录
cd frontend

# 启动开发服务器
npm run dev
```

## 验证步骤

1. 访问 http://localhost:3000 验证首页
2. 切换语言 /zh, /en, /ru 验证多语言
3. 检查页面源码验证 SEO meta 标签
4. 提交留言表单验证后端接收
