'use client'

import { useProjectStore } from '@/stores/project-store'
import { useTaskStore } from '@/stores/task-store'
import { useMemberStore } from '@/stores/member-store'

export default function DashboardPage() {
  const projects = useProjectStore((s) => s.projects)
  const tasks = useTaskStore((s) => s.tasks)
  const members = useMemberStore((s) => s.members)

  const activeTasks = tasks.filter((t) => t.status !== 'done').length
  const completedTasks = tasks.filter((t) => t.status === 'done').length

  const stats = [
    {
      label: 'TOTAL PROJECTS',
      value: projects.length,
      icon: 'folder',
      trend: '+2 this week',
      up: true,
      bgColor: 'bg-primary',
      iconColor: 'text-primary-foreground',
    },
    {
      label: 'ACTIVE TASKS',
      value: activeTasks,
      icon: 'task_alt',
      trend: '+5 this week',
      up: true,
      bgColor: 'bg-secondary',
      iconColor: 'text-secondary-foreground',
    },
    {
      label: 'COMPLETED',
      value: completedTasks,
      icon: 'check_circle',
      trend: '+12 this week',
      up: true,
      bgColor: 'bg-tertiary',
      iconColor: 'text-tertiary-foreground',
    },
    {
      label: 'TEAM MEMBERS',
      value: members.length,
      icon: 'groups',
      trend: '+1 this week',
      up: true,
      bgColor: 'bg-surface-container-high',
      iconColor: 'text-on-surface',
    },
  ]

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weekData = [8, 12, 6, 14, 10, 4, 7]
  const maxVal = Math.max(...weekData)

  const recentActivities = [
    {
      user: 'Sarah Jenkins',
      action: 'completed',
      task: 'Dashboard Redesign',
      time: '10 min ago',
      category: 'Design',
      avatar: 'SJ',
      categoryColor: 'bg-primary/10 text-primary',
    },
    {
      user: 'Marcus Brown',
      action: 'commented on',
      task: 'API Integration',
      time: '30 min ago',
      category: 'Development',
      avatar: 'MB',
      categoryColor: 'bg-secondary/10 text-secondary',
    },
    {
      user: 'Kim Lee',
      action: 'uploaded files to',
      task: 'Brand Guidelines',
      time: '1 hour ago',
      category: 'Design',
      avatar: 'KL',
      categoryColor: 'bg-primary/10 text-primary',
    },
    {
      user: 'Tom Wilson',
      action: 'moved',
      task: 'User Authentication',
      time: '2 hours ago',
      category: 'Development',
      avatar: 'TW',
      categoryColor: 'bg-secondary/10 text-secondary',
    },
    {
      user: 'Alex Rivera',
      action: 'created',
      task: 'Sprint Planning Q3',
      time: '3 hours ago',
      category: 'Planning',
      avatar: 'AR',
      categoryColor: 'bg-tertiary/10 text-tertiary',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-[36px] font-bold text-on-surface">Dashboard</h2>
          <p className="text-[16px] text-on-surface-variant">
            Welcome back, Alex. Here&apos;s what&apos;s happening with your projects today.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-lg font-semibold text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            Export Report
          </button>
          <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Project
          </button>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <span className={`material-symbols-outlined text-[24px] ${stat.iconColor}`}>
                  {stat.icon}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`material-symbols-outlined text-[16px] ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                  trending_up
                </span>
                <span className={`text-[12px] font-medium ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
            <p className="text-[12px] text-on-surface-variant font-bold uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className="text-[28px] font-semibold text-on-surface">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Middle Section: Weekly Progress + Featured Project */}
      <div className="grid grid-cols-3 gap-5">
        {/* Weekly Progress Chart */}
        <div className="col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[18px] font-semibold text-on-surface">Weekly Progress</h3>
              <p className="text-[14px] text-on-surface-variant mt-1">Tasks completed per day this week</p>
            </div>
            <select className="bg-surface-container border border-outline-variant rounded-lg px-3 py-1.5 text-[14px] text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary">
              <option>This Week</option>
              <option>Last Week</option>
              <option>2 Weeks Ago</option>
            </select>
          </div>
          <div className="flex items-end justify-between gap-4 flex-1 pb-2">
            {weekDays.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[12px] text-on-surface-variant font-medium">{weekData[i]}</span>
                <div className="w-full flex-1 flex items-end">
                  <div
                    className="w-full bg-primary/80 rounded-t-md transition-all group-hover:bg-primary group-hover:shadow-md"
                    style={{ height: `${(weekData[i] / maxVal) * 100}%` }}
                  />
                </div>
                <span className="text-[12px] text-on-surface-variant">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Project Card */}
        <div className="col-span-1 bg-primary rounded-xl p-6 text-on-primary relative overflow-hidden min-h-[400px] flex flex-col">
          {/* Decorative blur circle */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-white/5 rounded-full blur-xl" />

          <div className="relative z-10 flex flex-col h-full">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-on-primary/20 text-on-primary text-[12px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                High Priority
              </span>
            </div>

            {/* Project Info */}
            <div className="flex-1">
              <h3 className="text-[20px] font-bold mb-2">Mobile App Redesign</h3>
              <p className="text-on-primary/80 text-[14px] leading-relaxed mb-6">
                Complete overhaul of the mobile application with new design system and improved UX patterns.
              </p>

              {/* Team Avatars */}
              <div className="flex items-center gap-2 mb-6">
                {['SJ', 'MB', 'KL', 'TW'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-on-primary/20 flex items-center justify-center text-[12px] font-semibold border-2 border-on-primary/30"
                  >
                    {initials}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-on-primary/10 flex items-center justify-center text-[12px] font-semibold">
                  +3
                </div>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[14px] font-medium">Progress</span>
                <span className="text-[14px] font-semibold">68%</span>
              </div>
              <div className="w-full h-2 bg-on-primary/20 rounded-full overflow-hidden">
                <div className="h-full bg-on-primary rounded-full" style={{ width: '68%' }} />
              </div>
              <div className="flex items-center gap-1 mt-3 text-[12px] text-on-primary/70">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>Due Dec 15, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl">
        <div className="flex items-center justify-between p-6 pb-4">
          <h3 className="text-[18px] font-semibold text-on-surface">Recent Activity</h3>
          <button className="text-[14px] text-primary font-semibold hover:opacity-80 transition-all flex items-center gap-1">
            View All History
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
        <div>
          {recentActivities.map((activity, i) => (
            <div key={i}>
              <div className="flex items-center gap-4 px-6 py-4 hover:bg-surface-container-low transition-all">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-on-primary text-[16px] font-bold shrink-0">
                  {activity.avatar}
                </div>

                {/* Activity Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-on-surface">
                    <span className="font-semibold">{activity.user}</span>{' '}
                    <span className="text-on-surface-variant">{activity.action}</span>{' '}
                    <span className="font-semibold text-primary">{activity.task}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px] text-on-surface-variant">schedule</span>
                    <span className="text-[12px] text-on-surface-variant">{activity.time}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <span className={`text-[12px] font-semibold px-3 py-1 rounded-full shrink-0 ${activity.categoryColor}`}>
                  {activity.category}
                </span>
              </div>
              {i < recentActivities.length - 1 && (
                <div className="mx-6 border-t border-outline-variant" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
