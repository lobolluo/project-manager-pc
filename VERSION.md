# ProjectFlow - 版本记录

## 版本说明

本文档记录 ProjectFlow 的版本历史和发布计划。

---

## 当前版本

| 版本 | 状态 | 发布日期 | 说明 |
|------|------|----------|------|
| **v0.2.0** | ✅ 已完成 | 2026-06-07 | Stitch 设计稿 UI 还原 |
| **v0.1.0** | ✅ 已完成 | 2026-06-07 | 基础框架 + 部署上线 |

---

## 版本历史

### v0.2.0 - Stitch UI 还原 (已完成)

**完成日期**: 2026-06-07

#### ✅ 已完成

- [x] MD3 颜色 token 系统替换（primary=#21417f, background=#f7f9fc）
- [x] 字体切换（Geist → Inter）
- [x] 图标系统切换（Lucide → Material Symbols Outlined）
- [x] 侧边栏重设计（深色 → 浅色，品牌 logo + 组织卡片）
- [x] 顶栏重设计（胶囊搜索栏 + 用户信息区）
- [x] Dashboard 还原（统计卡片 + 周进度图表 + 精选项目 + 最近活动）
- [x] Kanban 还原（分类彩色边框 + Material 图标 + 保留拖拽功能）
- [x] Project Detail 还原（新增 Timeline 时间线 + Members 成员标签页）
- [x] Settings 还原（双栏布局 + 头像上传 + 主题预览卡片）
- [x] 新增 Team 团队页面（成员网格 + 最近协作 + 团队统计）

---

### v0.1.0 - 基础框架 (已完成)

**开始日期**: 2026-06-06
**完成日期**: 2026-06-07

#### ✅ 已完成

- [x] 项目架构搭建（Next.js 16 + TypeScript + Tailwind CSS v4）
- [x] Shadcn UI v4 组件安装（12 个组件）
- [x] Zustand + persist 状态管理配置
- [x] 标准文档模板初始化
- [x] GitHub 仓库创建
- [x] Stitch 设计稿生成（4 页面 10 个设计）
- [x] 布局框架（侧边栏 + 顶栏 + 主内容区）
- [x] 仪表盘页面（统计卡片 + 周进度图表 + 最近活动）
- [x] 看板页面（三列拖拽 + 任务 CRUD + 搜索筛选）
- [x] 项目详情页（概览/任务列表/成员 Tab）
- [x] 设置页面（个人资料 + 通知开关 + 主题切换）
- [x] 数据持久化（Zustand persist + localStorage）
- [x] AWS EC2 部署（t3.micro + 2GB swap）
- [x] README 截图整理

#### ⏳ 待完成

- [ ] Playwright E2E 测试
- [ ] 录屏

#### 🐛 已知问题

- t3.micro 内存不足，需 2GB swap 辅助构建
- pnpm 11 的 minimumReleaseAge 策略需清理 lockfile 后安装

---

## 版本命名规则

- **Major.Minor.Patch**（主版本.次版本.补丁）
- **Major**: 重大架构变更或不兼容更新
- **Minor**: 新功能添加，向后兼容
- **Patch**: Bug 修复，不影响功能

| 变更类型 | 版本更新 | 示例 |
|---------|---------|------|
| 新增功能 | MINOR+1 | v0.1.0 → v0.2.0 |
| Bug 修复 | PATCH+1 | v0.1.0 → v0.1.1 |
| 架构重构 | MAJOR+1 | v1.0.0 → v2.0.0 |
