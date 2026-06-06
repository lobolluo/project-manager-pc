'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Dashboard', icon: 'dashboard' },
  { href: '/kanban', label: 'Kanban Board', icon: 'view_kanban' },
  { href: '/projects', label: 'Projects', icon: 'folder_open' },
  { href: '/team', label: 'Team', icon: 'group' },
  { href: '/settings', label: 'Settings', icon: 'settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-surface-container-highest flex flex-col border-r border-outline-variant z-50">
      {/* Logo */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-container rounded flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>view_quilt</span>
          </div>
          <div>
            <h1 className="text-[20px] font-semibold text-on-surface leading-tight">ProPlan</h1>
            <p className="text-[12px] text-on-surface-variant opacity-70">Management Suite</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 transition-colors group',
                active
                  ? 'border-l-4 border-primary text-on-primary-container bg-primary-container'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              )}
            >
              <span
                className={cn('material-symbols-outlined group-hover:scale-110 transition-transform', active && "[font-variation-settings:'FILL'_1,'wght'_400,'GRAD'_0,'opsz'_24]")}
              >
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Org Card */}
      <div className="p-6">
        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>business</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-[13px] font-semibold text-on-surface truncate">TechFlow Inc.</p>
            <p className="text-[12px] text-on-surface-variant">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
