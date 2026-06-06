import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IProject } from '@/types'
import { mockProjects } from '@/lib/mock-data'

interface IProjectStore {
  projects: IProject[]
  addProject: (project: IProject) => void
  updateProject: (id: string, data: Partial<IProject>) => void
  deleteProject: (id: string) => void
  getProjectById: (id: string) => IProject | undefined
}

export const useProjectStore = create<IProjectStore>()(
  persist(
    (set, get) => ({
      projects: mockProjects,
      addProject: (project) =>
        set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, data) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),
      getProjectById: (id) => get().projects.find((p) => p.id === id),
    }),
    { name: 'project-flow-projects' }
  )
)
