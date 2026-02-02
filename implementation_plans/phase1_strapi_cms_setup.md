# Phase 1: Strapi CMS 后端搭建

## 目标

使用 Strapi 搭建 Headless CMS 后端，定义内容模型，提供 REST API。

## 任务清单

### 1.1 初始化 Strapi 项目
- [ ] 创建 Strapi 项目（使用 SQLite 开发数据库）
- [ ] 配置基础设置

### 1.2 创建内容模型 (Content Types)

#### 公司简介 (company-profile)
| 字段 | 类型 | 说明 |
|------|------|------|
| title | String | 标题 |
| content | RichText | 富文本内容 |
| language | Enum (zh/en/ru) | 语言 |
| seo_title | String | SEO 标题 |
| seo_description | Text | SEO 描述 |

#### 公司动态 (news)
| 字段 | 类型 | 说明 |
|------|------|------|
| title | String | 标题 |
| summary | Text | 摘要 |
| content | RichText | 正文 |
| cover_image | Media | 封面图 |
| publish_date | Date | 发布日期 |
| language | Enum (zh/en/ru) | 语言 |
| slug | UID | URL 标识 |
| seo_title | String | SEO 标题 |
| seo_description | Text | SEO 描述 |

#### 行业发展 (industry)
| 字段 | 类型 | 说明 |
|------|------|------|
| title | String | 标题 |
| content | RichText | 内容 |
| language | Enum (zh/en/ru) | 语言 |
| seo_title | String | SEO 标题 |
| seo_description | Text | SEO 描述 |

#### 产品 (product)
| 字段 | 类型 | 说明 |
|------|------|------|
| product_name | String | 产品名称 |
| description | RichText | 产品描述 |
| image | Media | 产品图片 |
| sort_order | Integer | 排序 |
| language | Enum (zh/en/ru) | 语言 |
| seo_title | String | SEO 标题 |
| seo_description | Text | SEO 描述 |

#### 留言 (contact-message)
| 字段 | 类型 | 说明 |
|------|------|------|
| name | String | 姓名 |
| email | Email | 邮箱 |
| phone | String | 电话 |
| message | Text | 留言内容 |
| language | Enum (zh/en/ru) | 语言 |
| ip | String | IP 地址 |

### 1.3 配置 API 权限
- [ ] 配置 Public 角色可读取内容
- [ ] 配置 Public 角色可提交留言
- [ ] 配置 Admin 角色管理所有内容

## 执行命令

```bash
# 创建 Strapi 项目
npx create-strapi-app@latest cms --quickstart

# 进入项目目录
cd cms

# 启动开发服务器
npm run develop
```

## 验证步骤

1. 访问 http://localhost:1337/admin 创建管理员账号
2. 在 Content-Type Builder 中验证所有模型已创建
3. 测试 API 端点：
   - GET /api/company-profiles?filters[language][$eq]=zh
   - GET /api/news?filters[language][$eq]=zh
   - POST /api/contact-messages
