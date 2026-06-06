import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ITask, TStatus } from '@/types'
import { mockTasks } from '@/lib/mock-data'

interface ITaskStore {
  tasks: ITask[]
  addTask: (task: ITask) => void
  updateTask: (id: string, data: Partial<ITask>) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, status: TStatus) => void
  getTasksByProject: (projectId: string) => ITask[]
  getTasksByStatus: (status: TStatus) => ITask[]
}

export const useTaskStore = create<ITaskStore>()(
  persist(
    (set, get) => ({
      tasks: mockTasks,
      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id, data) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      moveTask: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
          ),
        })),
      getTasksByProject: (projectId) =>
        get().tasks.filter((t) => t.projectId === projectId),
      getTasksByStatus: (status) =>
        get().tasks.filter((t) => t.status === status),
    }),
    { name: 'project-flow-tasks' }
  )
)
