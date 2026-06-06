# ProjectFlow - 变更日志

记录每个版本的技术决策、实现细节和接口变更。

---

## v0.2.0 - Stitch UI 还原 (2026-06-07)

### 新增

- MD3 (Material Design 3) 颜色 token 系统（全局 CSS 变量）
- Material Symbols Outlined 图标字体
- Inter 字体支持
- Stitch 设计稿 HTML 归档（10 个文件存入 docs/stitch-designs/）
- Team 团队页面（成员网格 + 最近协作 + 团队统计卡片）
- Project Detail 页面 Timeline 标签页（垂直时间线 + 里程碑动画）
- Project Detail 页面 Members 标签页增强（在线状态 + 最近协作 + 团队统计）

### 变更

- 全局 CSS：从 shadcn 默认 oklch 颜色切换到 MD3 hex 颜色 token
- 侧边栏：深色(#2c3e50) → 浅色(#eceef1)，添加品牌 logo、组织卡片，移除折叠功能
- 顶栏：搜索改为胶囊样式，添加帮助按钮和用户信息区
- Dashboard：4 统计卡片重设计 + 周进度柱状图 + 精选项目蓝色卡片 + 最近活动列表
- Kanban：任务卡片添加分类彩色左边框，列头使用 Material 图标
- Settings：改为双栏布局，添加头像上传、主题预览卡片、通知图标
- Projects 列表：适配 MD3 颜色 token

### 技术决策

| 决策 | 选择 | 原因 |
|------|------|------|
| 图标系统 | Material Symbols Outlined | Stitch 设计稿使用，视觉一致 |
| 颜色系统 | MD3 token | Stitch 设计系统定义的标准 token |
| 字体 | Inter | Stitch 设计系统指定 |
| 设计参考 | Stitch HTML 归档 | 保留原始设计稿便于后续对照 |

---

## v0.1.0 - 基础框架 (2026-06-07)

### 新增

- Next.js 16 + TypeScript + App Router 项目初始化
- Tailwind CSS v4 + Shadcn UI v4 (12 个组件: button, card, input, select, badge, avatar, dialog, dropdown-menu, tabs, progress, separator, tooltip)
- Zustand + persist 中间件状态管理
- 标准项目文档初始化（PRD, VERSION, CHANGELOG, ROADMAP, BACKLOG, API, README）
- Stitch 设计稿生成（仪表盘、看板、项目详情、设置页共 10 个设计）
- 仪表盘页面（4 统计卡片 + CSS 柱状图 + 最近活动流）
- 看板页面（三列 HTML5 原生拖拽 + 任务 CRUD + 搜索筛选）
- 项目列表 + 详情页（概览/任务列表/成员三个 Tab）
- 设置页面（个人资料 + 通知 Toggle + 主题/语言切换）
- 侧边栏导航（可折叠 + 当前页高亮 + 用户信息）
- Mock 数据（8 成员、3 项目、12 任务）
- AWS EC2 部署（t3.micro + 2GB swap + pm2）

### 变更

- 移除未使用的依赖：@dnd-kit、@tanstack/react-query、react-hook-form、@hookform/resolvers、zod
- 看板拖拽改用 HTML5 原生拖拽事件（onDragStart/onDragOver/onDrop），无需第三方库
- 移除项目详情页中的时间线 Tab（纯静态假数据，无实际功能）

### 技术决策

| 决策 | 选择 | 原因 |
|------|------|------|
| 框架 | Next.js 16 (App Router) | 作业要求，SSG 模式足够 |
| UI 库 | Shadcn UI v4 (@base-ui/react) | 可定制性强，与 Tailwind 深度集成 |
| 状态管理 | Zustand + persist | 轻量级，内置 localStorage 持久化 |
| 拖拽方案 | HTML5 原生拖拽 | 够用，减少依赖包数量 |
| 数据持久化 | localStorage | 无需后端，满足 MVP 需求 |
| 部署方式 | AWS EC2 t3.micro + swap | Free Tier，2GB swap 弥补内存不足 |
| 包管理器 | pnpm | 安装速度快，磁盘占用小 |

### 踩坑记录

#### 1. Shadcn UI v4 API 变更

Shadcn v4 底层从 Radix UI 切换为 @base-ui/react，API 有破坏性变更：

- `asChild` 属性不存在 → 改用 `render` prop：`<DialogTrigger render={(props) => <Button {...props} />}>`
- Select `onValueChange` 签名变为 `(value: string | null, eventDetails) => void` → 需要包装：`onValueChange={(v) => setState(v ?? 'default')}`

#### 2. pnpm 11 minimumReleaseAge 策略

pnpm 11 内置 supply-chain policy，会拒绝发布时间过新的包。解决方案：

```bash
# 清理 lockfile 重新解析
pnpm clean --lockfile
pnpm install --no-frozen-lockfile
```

#### 3. t3.micro 内存不足 (1GB)

`pnpm install` 和 `next build` 均会 OOM。解决方案：

```bash
# 添加 2GB swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

同时精简了 8 个未使用的依赖包，将依赖数从 689 降至约 680，减少内存占用。

#### 4. 精简依赖

通过 `grep` 检查实际 import 发现以下包完全未使用，果断移除：
- @dnd-kit/* → 看板用的是原生 HTML5 拖拽
- @tanstack/react-query → 全部用 Zustand 管理
- react-hook-form + @hookform/resolvers + zod → 表单用 useState

---
