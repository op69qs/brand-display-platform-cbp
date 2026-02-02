# 企业官网系统部署文档

## 项目结构

```
brand-display-platform/
├── cms/                    # Strapi CMS 后端
│   ├── src/api/           # API 内容模型
│   └── ...
├── frontend/              # Next.js 前端
│   ├── src/
│   │   ├── app/[lang]/   # 多语言页面
│   │   ├── components/    # 组件
│   │   └── lib/           # 工具函数
│   └── ...
└── document/              # 项目文档
```

---

## 快速启动（开发环境）

### 1. 启动 CMS 后端

```bash
cd cms
npm run develop
```

- CMS 管理后台: http://localhost:1337/admin
- 首次访问需创建管理员账号

### 2. 启动前端

```bash
cd frontend
npm run dev
```

- 前端访问: http://localhost:3000
- 自动重定向到 http://localhost:3000/zh

---

## CMS 内容管理

### 登录后台

访问 `http://localhost:1337/admin`，使用管理员账号登录。

### 内容模型

| 模型 | 说明 | API 端点 |
|------|------|----------|
| 公司简介 | 公司介绍 | `/api/company-profiles` |
| 公司动态 | 新闻列表 | `/api/news-items` |
| 行业发展 | 行业内容 | `/api/industries` |
| 产品 | 产品展示 | `/api/products` |
| 留言 | 客户留言 | `/api/contact-messages` |

### 配置 API 权限

1. 进入 Settings → Users & Permissions → Roles
2. 选择 Public 角色
3. 开启以下权限：
   - company-profile: find, findOne
   - news: find, findOne
   - industry: find, findOne
   - product: find, findOne
   - contact-message: create

### 添加内容

1. 在 Content Manager 选择对应模型
2. 点击 "Create new entry"
3. 填写内容，注意选择正确的 `language` (zh/en/ru)
4. 点击 "Publish" 发布

---

## 生产部署

### CMS 部署

```bash
cd cms

# 生产环境配置
# 修改 .env 设置数据库为 PostgreSQL

npm run build
npm run start
```

### 前端部署

```bash
cd frontend

# 设置环境变量
echo "NEXT_PUBLIC_STRAPI_URL=https://your-cms-domain.com" > .env.production.local

npm run build
npm run start
```

### Nginx 配置示例

```nginx
# CMS
server {
    listen 80;
    server_name cms.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}

# 前端
server {
    listen 80;
    server_name www.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

---

## 多语言 URL 结构

- 中文: `/zh/...`
- 英文: `/en/...`
- 俄文: `/ru/...`

访问根路径 `/` 会自动重定向到中文版本 `/zh`。

---

## 联系方式

如有问题，请联系开发团队。
