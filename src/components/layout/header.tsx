'use client'

import { Bell, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/': '仪表盘',
  '/kanban': '看板',
  '/projects': '项目',
  '/settings': '设置',
}

export function Header() {
  const pathname = usePathname()

  const title =
    Object.entries(pageTitles).find(([path]) =>
      path === '/' ? pathname === '/' : pathname.startsWith(path)
    )?.[1] ?? 'ProjectFlow'

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索... (⌘K)"
            className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg w-56 focus:outline-none focus:border-[#3b5998] focus:ring-1 focus:ring-[#3b5998]"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  )
}
