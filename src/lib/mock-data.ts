import type { IProject, ITask, IMember, ISettings } from '@/types'

export const mockMembers: IMember[] = [
  { id: 'm1', name: '张三', email: 'zhangsan@example.com', role: 'manager', avatar: '' },
  { id: 'm2', name: '李四', email: 'lisi@example.com', role: 'developer', avatar: '' },
  { id: 'm3', name: '王五', email: 'wangwu@example.com', role: 'designer', avatar: '' },
  { id: 'm4', name: '赵六', email: 'zhaoliu@example.com', role: 'developer', avatar: '' },
  { id: 'm5', name: '孙七', email: 'sunqi@example.com', role: 'tester', avatar: '' },
  { id: 'm6', name: '周八', email: 'zhouba@example.com', role: 'developer', avatar: '' },
  { id: 'm7', name: '吴九', email: 'wujiu@example.com', role: 'designer', avatar: '' },
  { id: 'm8', name: '郑十', email: 'zhengshi@example.com', role: 'developer', avatar: '' },
]

export const mockProjects: IProject[] = [
  {
    id: 'p1',
    name: '前端重构项目',
    description: '对现有前端架构进行全面重构，采用 Next.js 16 + TypeScript 技术栈，提升开发效率和用户体验。',
    status: 'active',
    progress: 68,
    startDate: '2026-03-01',
    endDate: '2026-07-31',
    ownerId: 'm1',
    memberIds: ['m1', 'm2', 'm3', 'm4', 'm5'],
  },
  {
    id: 'p2',
    name: '移动端 App 开发',
    description: '开发公司内部使用的移动端应用，支持 iOS 和 Android 双平台。',
    status: 'active',
    progress: 35,
    startDate: '2026-04-15',
    endDate: '2026-09-30',
    ownerId: 'm2',
    memberIds: ['m2', 'm4', 'm6', 'm8'],
  },
  {
    id: 'p3',
    name: '数据可视化平台',
    description: '搭建数据可视化平台，支持实时数据展示和自定义报表功能。',
    status: 'completed',
    progress: 100,
    startDate: '2026-01-10',
    endDate: '2026-05-20',
    ownerId: 'm1',
    memberIds: ['m1', 'm3', 'm5', 'm7'],
  },
]

export const mockTasks: ITask[] = [
  { id: 't1', title: '首页布局重构', status: 'todo', priority: 'high', projectId: 'p1', assigneeId: 'm2', dueDate: '2026-06-15', tags: ['前端', '重构'], createdAt: '2026-06-01', updatedAt: '2026-06-01', description: '重新设计首页布局结构' },
  { id: 't2', title: '用户登录模块', status: 'todo', priority: 'high', projectId: 'p1', assigneeId: 'm4', dueDate: '2026-06-20', tags: ['前端', '认证'], createdAt: '2026-06-02', updatedAt: '2026-06-02' },
  { id: 't3', title: '数据表格组件', status: 'todo', priority: 'medium', projectId: 'p1', assigneeId: 'm2', dueDate: '2026-06-25', tags: ['组件', 'UI'], createdAt: '2026-06-03', updatedAt: '2026-06-03' },
  { id: 't4', title: 'API 接口对接', status: 'todo', priority: 'medium', projectId: 'p2', assigneeId: 'm6', dueDate: '2026-06-18', tags: ['后端', '接口'], createdAt: '2026-06-04', updatedAt: '2026-06-04' },
  { id: 't5', title: '设计稿评审', status: 'todo', priority: 'low', projectId: 'p1', assigneeId: 'm3', dueDate: '2026-06-12', tags: ['设计'], createdAt: '2026-06-05', updatedAt: '2026-06-05' },
  { id: 't6', title: '侧边栏导航', status: 'in-progress', priority: 'high', projectId: 'p1', assigneeId: 'm2', dueDate: '2026-06-10', tags: ['前端', '组件'], createdAt: '2026-05-28', updatedAt: '2026-06-04' },
  { id: 't7', title: '表单验证逻辑', status: 'in-progress', priority: 'medium', projectId: 'p1', assigneeId: 'm4', dueDate: '2026-06-14', tags: ['前端', '表单'], createdAt: '2026-05-30', updatedAt: '2026-06-03' },
  { id: 't8', title: 'App 启动页设计', status: 'in-progress', priority: 'medium', projectId: 'p2', assigneeId: 'm7', dueDate: '2026-06-16', tags: ['设计', '移动端'], createdAt: '2026-06-01', updatedAt: '2026-06-05' },
  { id: 't9', title: '项目框架搭建', status: 'done', priority: 'high', projectId: 'p1', assigneeId: 'm2', dueDate: '2026-06-01', tags: ['架构'], createdAt: '2026-05-25', updatedAt: '2026-06-01' },
  { id: 't10', title: '需求文档编写', status: 'done', priority: 'high', projectId: 'p1', assigneeId: 'm1', dueDate: '2026-05-28', tags: ['文档'], createdAt: '2026-05-20', updatedAt: '2026-05-27' },
  { id: 't11', title: '组件库选型', status: 'done', priority: 'medium', projectId: 'p1', assigneeId: 'm2', dueDate: '2026-06-03', tags: ['技术'], createdAt: '2026-05-26', updatedAt: '2026-06-02' },
  { id: 't12', title: '数据库设计', status: 'done', priority: 'high', projectId: 'p2', assigneeId: 'm8', dueDate: '2026-05-30', tags: ['后端', '数据库'], createdAt: '2026-05-22', updatedAt: '2026-05-29' },
]

export const mockSettings: ISettings = {
  username: '张三',
  email: 'zhangsan@example.com',
  role: '项目经理',
  notifications: {
    email: true,
    taskAssignment: true,
    deadline: true,
    projectUpdate: false,
  },
  theme: 'light',
  language: 'zh-CN',
}
