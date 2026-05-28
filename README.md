## PocketCMS - 

基于 PocketBase 的轻量级个人内容管理系统，支持内容创建、管理和分享。

## ✨ 功能特性

### 👤 用户端

- 用户注册/登录/退出
- 个人资料管理（头像/昵称/简介/密码修改）
- 内容管理（文章/笔记/文件，支持 Markdown）
- 封面图片上传与裁剪
- 标签系统与标签云
- 全文搜索（标题+内容）
- 可见性控制（公开/私有）
- 分享功能（链接/密码/过期时间）
- 文件管理（图片/视频/PDF 上传下载）
- 数据导出（JSON/CSV）
- 暗色/亮色主题切换

### 👑 管理员端

- 系统概览统计
- 用户管理（角色修改/删除/数据导出）
- 内容管理（查看所有内容/删除）
- 系统设置（站点名称/注册开关）


## 🚀 快速开始

### 1. 下载 PocketBase

从 [PocketBase 官网](https://pocketbase.io/download) 下载对应平台的可执行文件：

```bash
# Linux/macOS
wget https://github.com/pocketbase/pocketbase/releases/download/v0.38.0/pocketbase_0.38.0_linux_amd64.zip
unzip pocketbase_0.38.0_linux_amd64.zip

# Windows
# 下载 pocketbase_0.38.0_windows_amd64.zip 并解压
```

### 2. 放置前端文件

将本仓库的 `pb_public` 和 `pb_migrations` 目录放入 PocketBase 可执行文件所在目录：

```
pocketbase-cms/
├── pocketbase.exe
├── pb_data/          # 运行时生成
├── pb_public/        # ← 前端文件
└── pb_migrations/    # ← 数据库迁移脚本
```

### 3. 启动服务

```bash
# 开发环境
./pocketbase serve --http=127.0.0.1:8090

# 生产环境（允许局域网访问）
./pocketbase serve --http=0.0.0.0:8090 --maxFileSize=2147483648
```

### 4. 访问系统

| 地址                         | 说明                |
| -------------------------- | ----------------- |
| `http://localhost:8090`    | 首页                |
| `http://localhost:8090/_/` | 管理后台（首次访问创建超级管理员） |

### 5. 默认账号

| 角色   | 邮箱                  | 密码         |
| ---- | ------------------- | ---------- |
| 管理员  | `admin@example.com` | `admin123` |
| 演示用户 | `demo@example.com`  | `demo1234` |

> ⚠️ 首次使用后请及时修改默认密码！


## 📦 部署到服务器

### Linux (systemd)

创建服务文件 `/etc/systemd/system/pocketcms.service`：

```ini
[Unit]
Description=PocketCMS Server
After=network.target

[Service]
Type=simple
User=your_user
WorkingDirectory=/opt/pocketcms
ExecStart=/opt/pocketcms/pocketbase serve --http=0.0.0.0:8090
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

启动服务：

```bash
sudo systemctl enable pocketcms
sudo systemctl start pocketcms
```

### Windows (任务计划程序)

1. 创建 `start.bat`：
   
   ```batch
   @echo off
   pocketbase.exe serve --http=0.0.0.0:8090
   ```

2. 添加到启动项或任务计划程序

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[MIT](LICENSE)

## 🙏 致谢

- [PocketBase](https://pocketbase.io) - 优秀的开源后端
- [marked.js](https://marked.js.org) - Markdown 解析器
- [Cropper.js](https://fengyuanchen.github.io/cropperjs) - 图片裁剪库
- [FontAwesome](https://fontawesome.com) - 图标库

---

**PocketCMS**  
