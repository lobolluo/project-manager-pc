# 作业执行计划：项目管理 PC 端应用

> **课程**：京城一灯 · AI 全栈工程师
> **作业**：开篇课作业
> **日期**：2026-06-06

---

## 一、作业要求

### 四步任务

| 步骤 | 要求 | 涉及工具 |
|------|------|---------|
| **1. 生成设计稿** | 根据自己的创意生成设计稿 | Google Stitch |
| **2. 设计稿→代码** | 通过 MCP 将设计稿转化成熟悉的样式风格 | Stitch MCP / Claude Code |
| **3. AWS 部署** | 注册 AWS 学习账户（$100），使用 AWS MCP 部署到 EC2 | AWS MCP + EC2 |
| **4. 自动化测试** | 生成 PRD 文档，完成自动化测试流程，生成测试报告 | Playwright |

### 三个交付物

| 交付物 | 说明 |
|--------|------|
| **可访问链接** | 部署在 AWS EC2 上的在线应用 |
| **GitHub 地址** | 完整项目代码仓库（含 PRD、测试报告） |
| **录屏视频** | 上传到阿里云盘/百度网盘 |

---

## 二、项目创意：项目管理 PC 端

### 产品定位

一个面向小团队的轻量级项目管理工具，支持看板视图、任务管理、团队协作。

### 核心页面

```
┌─────────────────────────────────────────────┐
│                   顶栏导航                    │
├──────┬──────────────────────────────────────┤
│      │                                      │
│ 侧   │  仪表盘首页                          │
│ 边   │  ├── 项目概览卡片                     │
│ 栏   │  ├── 进度图表                         │
│ 导   │  └── 待办事项                         │
│ 航   │                                      │
│      ├──────────────────────────────────────┤
│ 📊   │  任务看板                            │
│ 📋   │  ├── 待办 | 进行中 | 已完成            │
│ 👥   │  └── 拖拽任务卡片                     │
│ ⚙️   │                                      │
│      ├──────────────────────────────────────┤
│      │  项目详情                            │
│      │  ├── 任务列表                        │
│      │  ├── 成员管理                        │
│      │  └── 时间线                          │
│      │                                      │
└──────┴──────────────────────────────────────┘
```

### 功能清单

| 模块 | 功能 | 优先级 |
|------|------|--------|
| 仪表盘 | 项目概览、进度统计、最近活动 | P0 |
| 项目管理 | 创建/编辑/删除/归档项目 | P0 |
| 任务管理 | 看板视图、列表视图、创建/编辑/删除任务 | P0 |
| 任务状态 | 待办/进行中/已完成，拖拽排序 | P0 |
| 团队成员 | 添加/移除成员、角色分配 | P1 |
| 筛选搜索 | 按项目/状态/负责人筛选 | P1 |
| 数据统计 | 项目进度图表、团队效率 | P2 |

---

## 三、技术选型

| 层次 | 选择 | 理由 |
|------|------|------|
| 框架 | **Next.js 15** (App Router) | CLAUDE.md 偏好，SSR/SSG 支持 |
| UI | **React 19 + Shadcn UI + Tailwind CSS v4** | CLAUDE.md 偏好，组件丰富 |
| 状态 | **Zustand + TanStack Query** | 轻量级状态管理 |
| 数据 | **localStorage → API** | 先本地开发，后接后端 |
| 包管理 | **pnpm** | 速度快 |
| 测试 | **Playwright 1.58**（已安装） | E2E 测试 |
| 部署 | **AWS EC2** (t3.micro Free Tier) | 课程要求 |

---

## 四、执行步骤（含各节点 Prompt）

---

### Step 0: 项目初始化

#### Prompt 0-A：Claude Code 初始化项目

复制以下 prompt 粘贴到 Claude Code 中执行：

```
帮我初始化一个项目管理 PC 端 Web 应用项目，要求如下：

1. 在当前目录下创建 GitHub 私有仓库 project-manager-pc
2. 使用 Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 初始化
3. 安装以下依赖：
   - zustand（状态管理）
   - @tanstack/react-query（服务端状态）
   - shadcn UI 组件：button, card, input, select, tabs, dialog, badge, dropdown-menu, avatar, progress, separator, tooltip
4. 复制 ~/.claude/templates/project-docs/ 下的所有 .md 模板到项目根目录
5. 推送到 GitHub main 分支

项目结构：
src/
├── app/           # Next.js App Router 页面
├── components/    # UI 组件
├── stores/        # Zustand stores
├── lib/           # 工具函数
└── types/         # TypeScript 类型定义

技术栈：Next.js 15 + React 19 + Shadcn UI + Tailwind CSS v4 + Zustand + TanStack Query
包管理器：pnpm
```

---

### Step 1: Stitch 生成设计稿

#### Prompt 1-A：Stitch 仪表盘页面

在 [stitch.withgoogle.com](https://stitch.withgoogle.com/) 中输入：

```
Design a project management dashboard page for PC web application.

Layout: sidebar navigation on the left (dark blue-gray, 240px wide) + top header bar + main content area.

Sidebar items: Dashboard (active), Kanban Board, Projects, Team, Settings. Each with an icon.

Main content:
- Top row: 4 stat cards showing "Total Projects: 12", "Active Tasks: 34", "Completed: 89", "Team Members: 8". Each card has an icon, number, and trend arrow.
- Middle section: A bar chart showing weekly task completion (Mon-Sun bars), titled "Weekly Progress"
- Bottom section: "Recent Activity" list with 5 items showing avatar, user name, action description, and timestamp (e.g., "张三 completed task 'API 接口设计' - 2 hours ago")

Color scheme: blue-gray primary (#3b5998), light gray background (#f5f7fa), white cards with subtle shadow.
Typography: clean sans-serif, modern professional look.
```

#### Prompt 1-B：Stitch 看板页面

```
Design a Kanban board page for a project management PC web application.

Layout: same sidebar and header as dashboard. Main content is a 3-column Kanban board.

Three columns with headers:
1. "待办 (Todo)" - light blue header, 5 task cards
2. "进行中 (In Progress)" - yellow/amber header, 3 task cards  
3. "已完成 (Done)" - green header, 4 task cards

Each task card shows:
- Task title (bold)
- Project tag (colored badge, e.g., "前端重构", "后端API")
- Priority indicator (red dot = high, yellow = medium, green = low)
- Assignee avatar (small circle, 24px)
- Due date in gray text

Add a "添加任务" button at the bottom of each column.
Add a top toolbar with: search input, filter dropdown (按负责人/优先级/项目), and "新建任务" primary button.

Style: clean, cards have subtle border and rounded corners. Drag-and-drop visual hint (dashed border on empty slots).
```

#### Prompt 1-C：Stitch 项目详情页

```
Design a project detail page for a project management PC web application.

Layout: same sidebar and header. Main content shows details of a specific project.

Top section:
- Breadcrumb: "项目 > 前端重构项目"
- Project title "前端重构项目" with status badge "进行中" (blue)
- Tabs: 概览 | 任务列表 | 成员 | 时间线

概览 tab content:
- Project description paragraph
- Key metrics row: 进度 68%, 任务 24/35, 截止日期 2026-07-15, 负责人 avatar group
- Progress bar (68% filled, blue gradient)
- Recent task list (5 rows in a table: 任务名, 状态, 负责人, 截止日期)

成员 tab content:
- Grid of member cards (3x2), each showing: avatar, name, role badge, email
- "邀请成员" button

时间线 tab content:
- Vertical timeline with 6 milestones, alternating left/right
- Each milestone: date, title, description, status icon (done=green check, current=blue pulse, upcoming=gray)

Style: professional blue-gray theme, clean white cards.
```

#### Prompt 1-D：Stitch 设置页面

```
Design a settings page for a project management PC web application.

Layout: same sidebar (with Settings highlighted) and header.

Content organized in sections with cards:

Section 1 - 个人资料:
- Avatar (80px) with "更换头像" button
- Form fields: 用户名 (input), 邮箱 (input), 角色 (dropdown)
- "保存修改" button

Section 2 - 通知设置:
- Toggle switches for: 邮件通知, 任务分配提醒, 截止日期提醒, 项目更新通知
- Each toggle with label and description text

Section 3 - 外观设置:
- Theme selector: 浅色 / 深色 / 跟随系统 (radio buttons)
- Language selector dropdown: 简体中文 / English

Section 4 - 危险区域:
- Red bordered card
- "删除账户" button (red) with warning text

Style: clean form layout, consistent with blue-gray theme.
```

---

### Step 2: Stitch 设计 → 代码

#### Prompt 2-A：Claude Code 读取 Stitch 设计并转代码

配置好 Stitch MCP 后，在 Claude Code 中输入：

```
使用 Stitch MCP 读取我刚才生成的项目管理 UI 设计稿。

将设计转为 Next.js 15 代码，要求：
- 使用 Shadcn UI + Tailwind CSS v4 组件
- 使用 App Router 路由结构
- TypeScript 严格类型
- 响应式适配（但以 PC 端为主，最小宽度 1024px）

目录结构：
src/
├── app/
│   ├── layout.tsx          # 根布局（侧边栏 + 顶栏）
│   ├── page.tsx            # 仪表盘首页
│   ├── kanban/page.tsx     # 看板页面
│   ├── projects/
│   │   ├── page.tsx        # 项目列表
│   │   └── [id]/page.tsx   # 项目详情
│   └── settings/page.tsx   # 设置页面
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx     # 侧边栏导航
│   │   └── header.tsx      # 顶栏
│   ├── dashboard/
│   │   ├── stat-card.tsx   # 统计卡片
│   │   ├── progress-chart.tsx  # 进度图表
│   │   └── recent-activity.tsx # 最近活动
│   ├── kanban/
│   │   ├── board.tsx       # 看板主体
│   │   ├── column.tsx      # 看板列
│   │   └── task-card.tsx   # 任务卡片
│   └── project/
│       ├── project-card.tsx # 项目卡片
│       ├── member-list.tsx  # 成员列表
│       └── timeline.tsx     # 时间线
├── stores/
│   ├── project-store.ts    # 项目状态
│   └── task-store.ts       # 任务状态
├── lib/
│   └── utils.ts            # 工具函数
└── types/
    └── index.ts            # 类型定义

先实现 layout.tsx（侧边栏+顶栏）和仪表盘页面 page.tsx。
```

#### Prompt 2-B：实现看板页面

```
继续实现项目管理应用的看板页面，要求：

1. 三列看板布局：待办 | 进行中 | 已完成
2. 使用 @dnd-kit/core 实现拖拽功能（先安装依赖 pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities）
3. 每个任务卡片显示：标题、项目标签（Badge）、优先级指示器、负责人头像、截止日期
4. 每列底部有"添加任务"按钮，点击弹出 Dialog 创建新任务
5. 任务卡片点击可编辑（Dialog 形式）
6. 顶部工具栏：搜索框 + 筛选下拉（按负责人/优先级/项目）+ "新建任务"按钮
7. 拖拽后自动更新任务状态（更新 Zustand store）
8. 使用 mock 数据展示效果（8-12个任务分布在三列中）

类型定义参考：
interface ITask {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  projectId: string;
  assigneeId: string;
  dueDate: string;
  tags: string[];
}
```

#### Prompt 2-C：实现项目详情页

```
继续实现项目管理应用的项目详情页，要求：

1. 页面路由：/projects/[id]
2. 顶部面包屑导航：项目 > {项目名}
3. Tab 切换四个视图：概览 | 任务列表 | 成员 | 时间线
4. 概览 Tab：
   - 项目描述、关键指标（进度%、任务数、截止日期、负责人）
   - 进度条组件
   - 任务表格（任务名、状态Badge、负责人、截止日期）
5. 成员 Tab：
   - 成员卡片网格（头像、姓名、角色Badge、邮箱）
   - "邀请成员"按钮
6. 时间线 Tab：
   - 垂直时间线组件，里程碑左右交替
   - 每个节点：日期、标题、描述、状态图标
7. 项目列表页 /projects：项目卡片网格，显示项目名、进度、成员头像组、任务统计

使用 Zustand store 管理项目数据，mock 2-3 个项目。
```

#### Prompt 2-D：实现设置页面 + 数据持久化

```
继续完成项目管理应用的剩余功能：

1. 设置页面 /settings：
   - 个人资料表单（头像、用户名、邮箱、角色）
   - 通知设置（4个 Toggle 开关）
   - 外观设置（主题切换浅色/深色/跟随系统）
   - 使用 React Hook Form + Zod 校验

2. 数据持久化：
   - 创建 src/lib/storage.ts 工具文件
   - 封装 localStorage 的 get/set/remove 方法
   - 为 Zustand store 添加 persist 中间件，自动保存到 localStorage
   - 页面刷新后数据不丢失

3. 侧边栏：
   - 当前页面高亮（使用 usePathname）
   - 可折叠/展开
   - 底部显示当前用户头像和名字

4. 全局搜索：
   - 顶栏添加搜索框
   - Command+K 快捷键触发搜索弹窗
   - 搜索范围：项目名、任务名、成员名

确保所有页面之间的导航和状态流转正常工作。
```

---

### Step 3: AWS 部署

#### Prompt 3-A：注册 AWS + 配置 CLI（手动操作）

此步骤需手动完成，无法用 prompt 自动化：

1. 访问 [aws.amazon.com/free](https://aws.amazon.com/free/) 注册账户
2. 在 IAM 控制台创建 Access Key
3. 终端运行 `aws configure` 输入凭证
4. 配置 AWS MCP Server 到 `~/.claude/settings.json`

#### Prompt 3-B：Claude Code 通过 AWS MCP 部署

```
使用 AWS MCP 帮我完成以下部署任务：

1. 在 ap-southeast-1（新加坡）区域创建一个 EC2 t3.micro 实例
   - 使用 Amazon Linux 2023 AMI（最新版）
   - 创建安全组 project-mgr-sg，开放端口：
     - 22（SSH）
     - 80（HTTP）
     - 3000（Next.js 开发服务器）
   - 创建 SSH Key Pair（名称：project-mgr-key）

2. 实例启动后，通过 SSH 连接并执行以下操作：
   - 安装 Node.js 22 LTS 和 pnpm
   - 从 GitHub 克隆我的项目仓库（私有仓库，需要配置 deploy key 或使用 personal access token）
   - 执行 pnpm install && pnpm build
   - 使用 PM2 启动应用：pm2 start pnpm --name "project-mgr" -- start
   - 配置 PM2 开机自启：pm2 save && pm2 startup

3. 确认实例公网 IP，验证 http://<公网IP>:3000 可访问

请一步一步执行，每步确认成功后再进行下一步。
```

#### Prompt 3-C：手动部署备选方案

如 AWS MCP 不可用，使用以下 prompt 指导 Claude Code 生成部署脚本：

```
帮我创建一个 AWS EC2 部署脚本 deploy/aws-deploy.sh，功能包括：

1. 使用 AWS CLI 启动 t3.micro 实例（ap-southeast-1）
2. 自动等待实例 running 状态
3. 通过 SSH 远程执行部署命令：
   - 安装 Node.js 22 + pnpm
   - 克隆 GitHub 仓库
   - 安装依赖并构建
   - PM2 守护启动

同时创建 deploy/aws-teardown.sh 用于清理资源（终止实例、删除安全组、删除密钥）。

脚本需要处理错误和重试逻辑，输出部署结果（公网 IP 和访问链接）。
```

---

### Step 4: PRD + 自动化测试

#### Prompt 4-A：生成 PRD 文档

```
基于当前项目（项目管理 PC 端应用），帮我生成完整的 PRD 文档，写入 PRD.md。

产品名称：ProjectFlow — 轻量级项目管理工具
目标用户：5-20 人的小团队（创业团队、学生项目组、自由职业协作组）

PRD 需包含以下章节：

1. 产品概述
   - 产品定位和核心价值
   - 目标用户画像
   - 竞品分析（Trello、Notion Project、Linear 的差异化）

2. 功能需求（按优先级 P0/P1/P2）
   P0 核心功能：
   - 仪表盘（项目概览、进度统计、最近活动）
   - 项目管理（创建/编辑/删除/归档）
   - 任务管理（看板视图、列表视图、CRUD）
   - 任务状态流转（待办→进行中→已完成，拖拽排序）
   
   P1 增强功能：
   - 团队成员管理（添加/移除/角色分配）
   - 筛选搜索（按项目/状态/负责人/优先级）
   - 数据统计（项目进度图表、团队效率）
   
   P2 未来功能：
   - 实时通知
   - 文件附件
   - API 集成

3. 用户故事和验收标准
   - 每个功能 2-3 个用户故事
   - 格式：作为 [角色]，我想要 [功能]，以便 [目标]
   - 验收标准：Given-When-Then 格式

4. 非功能性需求
   - 性能：首屏加载 < 2s
   - 兼容性：Chrome、Firefox、Edge 最新版
   - 数据：localStorage 持久化，刷新不丢失

5. 页面清单和路由设计
   - 列出所有页面、路由、对应的组件

请使用 markdown 格式，内容详实可直接作为开发参考。
```

#### Prompt 4-B：编写 Playwright 自动化测试

```
帮我编写完整的 Playwright E2E 测试套件，覆盖项目管理应用的所有核心功能。

先初始化 Playwright 配置（如尚未初始化）：
- 使用 TypeScript
- 浏览器：Chromium only（加速 CI）
- Base URL: http://localhost:3000
- 截图：失败时自动截图
- 视频：失败时录制

测试文件结构：
tests/
├── dashboard.spec.ts       # 仪表盘页面
├── kanban.spec.ts          # 看板视图
├── project-crud.spec.ts    # 项目增删改查
├── task-crud.spec.ts       # 任务增删改查
├── navigation.spec.ts      # 页面导航
└── settings.spec.ts        # 设置页面

测试用例要求：

dashboard.spec.ts：
- 应该正确渲染仪表盘页面
- 应该显示4个统计卡片
- 应该显示进度图表
- 应该显示最近活动列表

kanban.spec.ts：
- 应该显示三列看板（待办/进行中/已完成）
- 应该在每个列中显示任务卡片
- 应该能通过点击创建新任务
- 应该能拖拽任务到不同列（改变状态）
- 应该能编辑已有任务
- 应该能删除任务

project-crud.spec.ts：
- 应该能创建新项目
- 应该能查看项目详情
- 应该能编辑项目信息
- 应该能归档项目
- 应该显示项目进度条

task-crud.spec.ts：
- 应该能创建新任务（含标题、描述、优先级、负责人、截止日期）
- 应该能编辑任务属性
- 应该能切换任务状态
- 应该能删除任务
- 应该能按优先级/状态筛选任务

navigation.spec.ts：
- 应该能通过侧边栏导航到各页面
- 当前页面侧边栏项应该高亮
- 应该能通过面包屑导航返回

settings.spec.ts：
- 应该能修改个人资料
- 应该能切换通知设置
- 应该能切换主题

每个测试用例要有清晰的 describe/it 结构，使用 page.getByRole / page.getByText 等语义化选择器。
测试数据使用 fixtures 在 beforeEach 中初始化。
```

#### Prompt 4-C：运行测试 + 生成报告

```
帮我运行 Playwright 测试并生成报告：

1. 先启动 Next.js 开发服务器（后台运行）：
   pnpm dev &

2. 等待服务器就绪后运行测试：
   npx playwright test --reporter=html

3. 如果有测试失败：
   - 分析失败原因
   - 修复代码或测试用例中的问题
   - 重新运行直到全部通过

4. 生成最终测试报告：
   npx playwright show-report

5. 将测试报告导出为静态文件保存到项目 test-report/ 目录：
   npx playwright test --reporter=html 2>&1 | tee test-report/results.txt

6. 更新 PRD.md 中的验收状态，标记已通过的测试用例。

7. 生成测试总结写入 CHANGELOG.md，包含：
   - 测试用例总数、通过数、失败数
   - 覆盖的功能模块
   - 已知问题和待修复项
```

---

### Step 5: 交付物整理

#### Prompt 5-A：整理 GitHub 仓库

```
帮我整理项目 GitHub 仓库，确保包含完整的交付物：

1. 更新 README.md，包含：
   - 项目简介和截图（从本地截取4张：仪表盘、看板、项目详情、设置）
   - 功能特性列表
   - 技术栈
   - 本地开发指南（安装、启动、测试）
   - 部署说明（AWS EC2）
   - 项目结构说明

2. 确保以下文档存在且内容完整：
   - PRD.md（产品需求文档）
   - CHANGELOG.md（含测试报告总结）
   - VERSION.md（版本进度）
   - test-report/（测试报告）

3. 确认 .gitignore 包含：node_modules, .next, .env*, test-report/screenshots/

4. 提交所有更改并推送到 GitHub main 分支
```

#### Prompt 5-B：录屏内容大纲

录屏无需 prompt，按以下大纲操作即可：

| 时间段 | 内容 | 操作 |
|--------|------|------|
| 0:00-0:30 | 展示 Stitch 设计稿 | 打开 Stitch，展示 4 个页面设计 |
| 0:30-1:00 | 演示 MCP 转代码 | 在 Claude Code 中展示 Stitch MCP 读取和代码生成 |
| 1:00-2:00 | 演示应用功能 | 本地启动应用，依次展示仪表盘、看板拖拽、项目CRUD、设置 |
| 2:00-2:30 | AWS 部署 | 打开 EC2 公网 IP，展示在线访问 |
| 2:30-3:00 | 自动化测试 | 终端运行 npx playwright test，展示测试报告 |

---

## 五、前置准备清单

用户需要提前完成以下准备：

| 操作 | 说明 | 状态 |
|------|------|------|
| Google 账号 | 用于登录 Stitch（stitch.withgoogle.com） | ⬜ 待完成 |
| AWS 账户 | 注册 + 信用卡验证，获取 $100 额度 | ⬜ 待完成 |
| Stitch API Token | Stitch 设置页获取 | ⬜ 待完成 |
| AWS Access Key | IAM 控制台创建 | ⬜ 待完成 |

---

## 六、参考资源

### Stitch 相关
- [Stitch 官网](https://stitch.withgoogle.com/)
- [Stitch MCP GitHub](https://github.com/davideast/stitch-mcp)
- [Stitch MCP 使用教程](https://pasqualepillitteri.it/en/news/647/google-stitch-mcp-export-claude-code-design-to-code)
- [Stitch → Claude Code 集成指南](https://medium.com/devsecops-ai/how-google-stitch-claude-codes-mcp-integration-changed-the-way-i-build-products-63ecb8ed7f5a)

### AWS 相关
- [AWS MCP Server 官方文档](https://docs.aws.amazon.com/agent-toolkit/latest/userguide/getting-started-aws-mcp-server.html)
- [EC2 部署 MCP Server 教程](https://medium.com/@sharaddixit/building-and-deploying-an-mcp-server-on-aws-ec2-a-complete-guide-e91cdec02b78)
- [AWS Free Tier](https://aws.amazon.com/free/)

### 测试相关
- [Playwright 官方文档](https://playwright.dev/)
- [Playwright MCP Bridge](https://github.com/anthropics/playwright-mcp)

---

## 七、风险与注意事项

| 风险 | 应对方案 |
|------|---------|
| Stitch → Figma 导出空白 | 优先使用直接 React 代码导出，跳过 Figma |
| AWS 超出 Free Tier | 使用 t3.micro，设置账单告警 |
| Stitch MCP 连接失败 | 检查 API Token，确认 Node.js 版本 >= 18 |
| EC2 安全风险 | 仅开放 22 和 3000 端口，使用 SSH Key 登录 |
| 视频录制工具 | macOS 用 QuickTime（Cmd+Shift+5），或 OBS |
