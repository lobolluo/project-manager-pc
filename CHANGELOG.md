# ProjectFlow - 变更日志

记录每个版本的技术决策、实现细节和接口变更。

---

## v0.1.0 - 基础框架 (进行中)

### 新增

- Next.js 16 + TypeScript + App Router 项目初始化
- Tailwind CSS v4 + Shadcn UI (12 个组件: button, card, input, select, badge, avatar, dialog, dropdown-menu, tabs, progress, separator, tooltip)
- Zustand 状态管理库安装
- TanStack Query 安装
- 标准项目文档初始化（PRD, VERSION, CHANGELOG, ROADMAP, BACKLOG, API, README）
- Stitch 设计稿生成（仪表盘、看板、项目详情、设置页共 10 个设计）

### 变更

### 修复

### 技术决策

| 决策 | 选择 | 原因 |
|------|------|------|
| 框架 | Next.js 16 (App Router) | 作业要求，SSG 模式足够 |
| UI 库 | Shadcn UI | 可定制性强，与 Tailwind 深度集成 |
| 状态管理 | Zustand | 轻量级，适合中小型应用 |
| 拖拽库 | @dnd-kit | 现代化，支持 React 19 |
| 数据持久化 | localStorage | 无需后端，满足 MVP 需求 |
| 部署方式 | AWS EC2 (t3.micro) | Free Tier，作业要求 |
| 包管理器 | pnpm | 安装速度快 |

### 接口变更

---

## 变更日志格式

```
### vX.Y.Z - {标题} ({日期})

#### 新增
- 新功能 A

#### 变更
- 功能 A 的优化

#### 修复
- Bug A 修复

#### 技术决策
- 决策说明

#### 接口变更
- 接口路径及变更描述
```
