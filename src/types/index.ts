export type TStatus = 'todo' | 'in-progress' | 'done'
export type TPriority = 'high' | 'medium' | 'low'
export type TRole = 'manager' | 'developer' | 'designer' | 'tester'
export type TProjectStatus = 'active' | 'completed' | 'archived'

export interface IProject {
  id: string
  name: string
  description: string
  status: TProjectStatus
  progress: number
  startDate: string
  endDate: string
  ownerId: string
  memberIds: string[]
}

export interface ITask {
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

export interface IMember {
  id: string
  name: string
  email: string
  role: TRole
  avatar?: string
}

export interface ISettings {
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
