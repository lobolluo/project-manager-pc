import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ISettings } from '@/types'
import { mockSettings } from '@/lib/mock-data'

interface ISettingsStore {
  settings: ISettings
  updateSettings: (data: Partial<ISettings>) => void
}

export const useSettingsStore = create<ISettingsStore>()(
  persist(
    (set) => ({
      settings: mockSettings,
      updateSettings: (data) =>
        set((state) => ({
          settings: { ...state.settings, ...data },
        })),
    }),
    { name: 'project-flow-settings' }
  )
)
