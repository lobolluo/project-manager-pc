'use client'

import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/kanban': 'Kanban Board',
  '/projects': 'Projects',
  '/team': 'Team',
  '/settings': 'Settings',
}

export function Header() {
  const pathname = usePathname()

  const title =
    Object.entries(pageTitles).find(([path]) =>
      path === '/' ? pathname === '/' : pathname.startsWith(path)
    )?.[1] ?? 'ProjectFlow'

  return (
    <header className="h-16 w-full sticky top-0 z-40 bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-8 shadow-sm">
      <div className="flex items-center gap-6 flex-1">
        <span className="text-[20px] font-semibold text-primary">{title}</span>
        <div className="relative w-96 max-w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search tasks, projects, or team members..."
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-container placeholder-on-surface-variant"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors relative">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
          <span className="material-symbols-outlined text-[22px]">help_outline</span>
        </button>
        <div className="h-8 w-px bg-outline-variant mx-2" />
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="text-right">
            <p className="text-[13px] font-semibold text-on-surface">Alex Rivera</p>
            <p className="text-[12px] text-on-surface-variant">Project Manager</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-semibold text-sm border border-outline-variant group-hover:ring-2 group-hover:ring-primary transition-all">
            A
          </div>
        </div>
      </div>
    </header>
  )
}
