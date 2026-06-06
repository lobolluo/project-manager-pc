import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IMember } from '@/types'
import { mockMembers } from '@/lib/mock-data'

interface IMemberStore {
  members: IMember[]
  getMemberById: (id: string) => IMember | undefined
}

export const useMemberStore = create<IMemberStore>()(
  persist(
    (set, get) => ({
      members: mockMembers,
      getMemberById: (id) => get().members.find((m) => m.id === id),
    }),
    { name: 'project-flow-members' }
  )
)
