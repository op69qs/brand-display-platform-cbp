# 企业官网系统 (Brand Display Platform)

## 项目概述

一个低复杂度、可维护、支持多语言的企业展示型官网，用于展示公司信息及产品，并支持客户在线留言。

## 技术架构

```
[ 浏览器 / 移动端 ]
        |
        v
[ 前端应用（Next.js）]
        |
        v
[ Headless CMS（Strapi） ]
        |
        v
[ 数据库（SQLite / PostgreSQL） ]
```

## 核心功能

- **三语言支持**：中文 / 英文 / 俄文
- **响应式设计**：PC + 移动端自适应
- **SEO 优化**：支持 Google / 百度收录
- **留言功能**：在线留言表单
- **CMS 管理**：非技术人员可维护内容

## 页面结构

| 页面 | 说明 |
|------|------|
| 首页 | 企业简介、产品概览、入口 |
| 公司简介 | 企业背景、愿景 |
| 公司动态 | 新闻/更新列表 |
| 行业发展 | 行业介绍 |
| 公司产品 | 产品列表展示 |
| 联系我们 | 联系方式 + 留言表单 |

## 目录结构

```
brand-display-platform/
├── document/              # 项目文档
├── implementation_plans/  # 实施计划
├── cms/                   # Strapi CMS 后端
└── frontend/              # Next.js 前端
```

## 快速开始

详见 `implementation_plans/` 目录下的实施计划文档。
