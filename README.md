# ProjectFlow — 轻量级项目管理工具

> 面向 5-20 人小团队的项目管理工具，提供看板、任务追踪、团队协作等核心功能。

## 功能特性

- **仪表盘** — 项目概览、统计卡片、周进度图表、最近活动
- **看板视图** — 三列看板（待办/进行中/已完成）、拖拽管理、任务 CRUD
- **项目管理** — 项目列表、详情概览、成员管理、项目时间线
- **设置页面** — 个人资料、通知偏好、主题切换

## 技术栈

| 分类 | 选择 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS v4 |
| UI 组件 | Shadcn UI |
| 状态管理 | Zustand (客户端) + TanStack Query (服务端) |
| 拖拽 | @dnd-kit |
| 表单 | React Hook Form + Zod |
| 数据持久化 | localStorage |
| 包管理 | pnpm |

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装

```bash
# 克隆项目
git clone https://github.com/lobolluo/project-manager-pc.git
cd project-manager-pc

# 安装依赖
pnpm install

# 启动开发服务
pnpm dev
```

### 常用命令

```bash
pnpm dev          # 开发 (http://localhost:3000)
pnpm build        # 构建
pnpm start        # 生产模式运行
pnpm lint         # 代码检查
```

## 项目结构

```
src/
├── app/
│   ├── layout.tsx          # 全局布局（侧边栏+顶栏）
│   ├── page.tsx            # 仪表盘
│   ├── kanban/page.tsx     # 看板页
│   ├── projects/
│   │   ├── page.tsx        # 项目列表
│   │   └── [id]/page.tsx   # 项目详情
│   └── settings/page.tsx   # 设置页
├── components/
│   ├── layout/             # 布局组件（sidebar, header）
│   └── ui/                 # Shadcn UI 组件
├── stores/                 # Zustand Store
│   ├── project-store.ts
│   ├── task-store.ts
│   ├── member-store.ts
│   └── settings-store.ts
├── types/
│   └── index.ts            # 类型定义
└── lib/
    └── utils.ts            # 工具函数
```

## 页面预览

| 页面 | 路由 | 说明 |
|------|------|------|
| 仪表盘 | `/` | 统计卡片 + 周进度 + 最近活动 |
| 看板 | `/kanban` | 三列拖拽看板 |
| 项目列表 | `/projects` | 项目卡片网格 |
| 项目详情 | `/projects/[id]` | 概览/成员/时间线 Tab |
| 设置 | `/settings` | 个人资料/通知/外观 |

## 标准文档

| 文档 | 用途 | 更新时机 |
|------|------|----------|
| [VERSION.md](VERSION.md) | 版本进度 | 功能完成/变更时 |
| [PRD.md](PRD.md) | 产品需求 | 新增/修改功能时 |
| [CHANGELOG.md](CHANGELOG.md) | 技术变更记录 | 每次功能完成时 |
| [API.md](API.md) | 接口文档 | 接口变更时 |
| [BACKLOG.md](BACKLOG.md) | 需求池 | 收集到新建议时 |
| [ROADMAP.md](ROADMAP.md) | 开发规划 | 阶段调整时 |

## 部署

AWS EC2 (ap-southeast-1) 部署，使用 pm2 进程管理。

```bash
# SSH 连接
ssh -i ~/.ssh/project-mgr-key.pem ec2-user@<IP>

# 部署
pnpm install && pnpm build
pm2 start pnpm --name "projectflow" -- start
```

## 许可证

MIT
