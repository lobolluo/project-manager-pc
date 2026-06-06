# ProjectFlow - 接口文档

## 基本信息

| 项目 | 内容 |
|------|------|
| 应用类型 | 纯前端 SPA（无后端 API） |
| 数据存储 | localStorage |
| 数据格式 | JSON |

---

## 数据结构说明

本项目为纯前端应用，所有数据通过 localStorage 持久化，使用 Zustand persist 中间件管理。

### Storage Keys

| Key | 类型 | 说明 |
|-----|------|------|
| `project-flow-projects` | IProject[] | 项目列表 |
| `project-flow-tasks` | ITask[] | 任务列表 |
| `project-flow-members` | IMember[] | 成员列表 |
| `project-flow-settings` | ISettings | 用户设置 |

---

## 数据接口（Zustand Store）

### Project Store

| 方法 | 说明 | 参数 | 返回 |
|------|------|------|------|
| `getProjects()` | 获取所有项目 | - | IProject[] |
| `getProjectById(id)` | 获取单个项目 | id: string | IProject \| undefined |
| `addProject(project)` | 创建项目 | IProject | void |
| `updateProject(id, data)` | 更新项目 | id, Partial<IProject> | void |
| `deleteProject(id)` | 删除项目 | id: string | void |

### Task Store

| 方法 | 说明 | 参数 | 返回 |
|------|------|------|------|
| `getTasks()` | 获取所有任务 | - | ITask[] |
| `getTasksByProject(projectId)` | 按项目筛选 | projectId: string | ITask[] |
| `getTasksByStatus(status)` | 按状态筛选 | status: TStatus | ITask[] |
| `addTask(task)` | 创建任务 | ITask | void |
| `updateTask(id, data)` | 更新任务 | id, Partial<ITask> | void |
| `deleteTask(id)` | 删除任务 | id: string | void |
| `moveTask(id, status)` | 移动任务状态 | id, TStatus | void |

### Settings Store

| 方法 | 说明 | 参数 | 返回 |
|------|------|------|------|
| `getSettings()` | 获取设置 | - | ISettings |
| `updateSettings(data)` | 更新设置 | Partial<ISettings> | void |

---

## 类型定义

```typescript
type TStatus = 'todo' | 'in-progress' | 'done'
type TPriority = 'high' | 'medium' | 'low'
type TRole = 'manager' | 'developer' | 'designer' | 'tester'

interface IProject {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'archived'
  progress: number
  startDate: string
  endDate: string
  ownerId: string
  memberIds: string[]
}

interface ITask {
  id: string
  title: string
  description?: string
  status: TStatus
  priority: TPriority
  projectId: string
  assigneeId: string
  dueDate: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface IMember {
  id: string
  name: string
  email: string
  role: TRole
  avatar?: string
}

interface ISettings {
  username: string
  email: string
  role: string
  notifications: {
    email: boolean
    taskAssignment: boolean
    deadline: boolean
    projectUpdate: boolean
  }
  theme: 'light' | 'dark' | 'system'
  language: 'zh-CN' | 'en-US'
}
```

---

## 接口变更记录

| 日期 | 接口 | 变更类型 | 说明 |
|------|------|----------|------|
| 2026-06-06 | 全部 | 新增 | 初始化数据模型和 Store 接口 |
