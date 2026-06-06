'use client'

import { use, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useProjectStore } from '@/stores/project-store'
import { useMemberStore } from '@/stores/member-store'
import { useTaskStore } from '@/stores/task-store'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

/* ---------- static mappings ---------- */

const priorityDot: Record<string, string> = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-green-500',
}

const roleLabels: Record<string, string> = {
  manager: '项目经理',
  developer: '开发工程师',
  designer: '设计师',
  tester: '测试工程师',
}

const roleColors: Record<string, string> = {
  manager: 'bg-red-50 text-red-700',
  developer: 'bg-green-50 text-green-700',
  designer: 'bg-purple-50 text-purple-700',
  tester: 'bg-amber-50 text-amber-700',
}

const statusBadgeMap: Record<string, { label: string; cls: string }> = {
  active: { label: '进行中', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  completed: { label: '已完成', cls: 'bg-green-50 text-green-700 border-green-200' },
  archived: { label: '已归档', cls: 'bg-gray-50 text-gray-600 border-gray-200' },
}

const taskStatusBadge: Record<string, { label: string; cls: string }> = {
  todo: { label: '待办', cls: 'bg-surface-container text-on-surface-variant border-outline-variant' },
  'in-progress': { label: '进行中', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
  done: { label: '已完成', cls: 'bg-green-50 text-green-700 border-green-200' },
}

/* ---------- mock timeline milestones ---------- */

interface IMilestone {
  id: string
  date: string
  title: string
  description: string
  status: 'completed' | 'active' | 'upcoming'
}

const mockMilestones: IMilestone[] = [
  { id: 'm1', date: '2025-01-15', title: '项目启动', description: '完成项目立项、团队组建与需求评审', status: 'completed' },
  { id: 'm2', date: '2025-02-20', title: '技术方案确定', description: '确认技术选型、系统架构设计完成', status: 'completed' },
  { id: 'm3', date: '2025-04-01', title: '核心功能开发', description: '完成核心模块开发，进入联调阶段', status: 'completed' },
  { id: 'm4', date: '2025-06-10', title: '内测发布', description: '内部测试版本上线，收集反馈优化', status: 'active' },
  { id: 'm5', date: '2025-08-15', title: '公测上线', description: '开放公测，大规模用户验证', status: 'upcoming' },
  { id: 'm6', date: '2025-10-01', title: '正式发布', description: 'v1.0 正式版本发布上线', status: 'upcoming' },
]

/* ---------- Material Symbols icon helper ---------- */

function Icon({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={cn('material-symbols-outlined select-none', className)}
      style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24", ...style }}
    >
      {name}
    </span>
  )
}

/* ---------- sub-components ---------- */

function MetricCard({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  const bgMap: Record<string, string> = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    amber: 'bg-amber-50',
    purple: 'bg-purple-50',
  }
  const iconColorMap: Record<string, string> = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    amber: 'text-amber-600',
    purple: 'text-purple-600',
  }
  return (
    <Card className="ring-1 ring-outline-variant/40">
      <CardContent className="p-5 flex items-center gap-4">
        <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center', bgMap[color])}>
          <Icon name={icon} className={cn('!text-[22px]', iconColorMap[color])} />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-on-surface-variant tracking-wide uppercase font-medium">{label}</p>
          <p className="text-lg font-semibold text-on-surface truncate">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function MemberCard({ member }: { member: ReturnType<typeof useMemberStore.getState>['members'][number] }) {
  const onlineStatuses = ['online', 'away', 'offline'] as const
  const statusDot: Record<string, string> = {
    online: 'bg-green-500',
    away: 'bg-yellow-400',
    offline: 'bg-gray-300',
  }
  // Deterministic pseudo-status based on member id
  const onlineIdx = member.id.charCodeAt(member.id.length - 1) % 3
  const online = onlineStatuses[onlineIdx]

  return (
    <Card className="ring-1 ring-outline-variant/40 hover:ring-primary/30 transition-all">
      <CardContent className="p-5 flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-lg font-semibold">
            {member.name[0]}
          </div>
          <span
            className={cn(
              'absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-surface',
              statusDot[online],
            )}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-on-surface truncate">{member.name}</p>
          <Badge className={cn('mt-1 text-xs border', roleColors[member.role] || 'bg-gray-50 text-gray-700')}>
            {roleLabels[member.role] || member.role}
          </Badge>
          <p className="text-xs text-on-surface-variant mt-2 truncate">{member.email}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function TimelineItem({ milestone, index }: { milestone: IMilestone; index: number }) {
  const isLeft = index % 2 === 0
  return (
    <div className={cn('flex items-start gap-6 w-full', isLeft ? 'flex-row' : 'flex-row-reverse')}>
      {/* Content card */}
      <div className={cn('flex-1 max-w-[calc(50%-24px)]', isLeft ? 'text-right' : 'text-left')}>
        <div
          className={cn(
            'inline-block rounded-xl p-4 ring-1',
            milestone.status === 'completed'
              ? 'bg-primary-container/40 ring-primary/20'
              : milestone.status === 'active'
                ? 'bg-surface-container ring-primary/30'
                : 'bg-surface ring-outline-variant/40',
          )}
        >
          <p className="text-xs text-on-surface-variant mb-1">{milestone.date}</p>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border',
                milestone.status === 'completed'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : milestone.status === 'active'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-gray-50 text-gray-500 border-gray-200',
              )}
            >
              {milestone.status === 'completed' && <Icon name="check" className="!text-[14px]" />}
              {milestone.status === 'active' && <Icon name="play_arrow" className="!text-[14px]" />}
              {milestone.status === 'completed' ? '已完成' : milestone.status === 'active' ? '进行中' : '待开始'}
            </span>
          </div>
          <p className="font-semibold text-on-surface text-sm">{milestone.title}</p>
          <p className="text-xs text-on-surface-variant mt-1">{milestone.description}</p>
        </div>
      </div>

      {/* Center dot */}
      <div className="flex flex-col items-center shrink-0">
        {milestone.status === 'completed' ? (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <Icon name="check" className="!text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }} />
          </div>
        ) : milestone.status === 'active' ? (
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
            </div>
            {/* Progress ring */}
            <svg className="absolute -inset-1 w-10 h-10 -rotate-90" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/20" />
              <circle
                cx="20"
                cy="20"
                r="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 17 * 0.65} ${2 * Math.PI * 17}`}
                strokeLinecap="round"
                className="text-primary"
              />
            </svg>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full border-2 border-outline-variant bg-surface" />
        )}
        {index < 5 && <div className="w-0.5 flex-1 bg-outline-variant/40 mt-1 min-h-[40px]" />}
      </div>

      {/* Spacer for the other side */}
      <div className="flex-1 max-w-[calc(50%-24px)]" />
    </div>
  )
}

/* ---------- main page ---------- */

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = useProjectStore((s) => s.getProjectById(id))
  const members = useMemberStore((s) => s.members)
  const tasks = useTaskStore((s) => s.getTasksByProject(id))
  const [memberSearch, setMemberSearch] = useState('')

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Icon name="folder_off" className="!text-[56px] text-on-surface-variant" />
        <p className="text-on-surface-variant text-lg">项目不存在</p>
        <Link href="/projects">
          <Button variant="outline">返回项目列表</Button>
        </Link>
      </div>
    )
  }

  const projectMembers = members.filter((m) => project.memberIds.includes(m.id))
  const owner = members.find((m) => m.id === project.ownerId)
  const doneTasks = tasks.filter((t) => t.status === 'done').length
  const statusInfo = statusBadgeMap[project.status] || statusBadgeMap.active

  const filteredMembers = memberSearch
    ? projectMembers.filter(
        (m) =>
          m.name.includes(memberSearch) ||
          m.email.includes(memberSearch) ||
          (roleLabels[m.role] || '').includes(memberSearch),
      )
    : projectMembers

  // Collaborations mock
  const collaborations = [
    { id: 'c1', members: [projectMembers[0], projectMembers[1]].filter(Boolean), task: 'UI 设计评审', date: '2 小时前' },
    { id: 'c2', members: [projectMembers[1], projectMembers[2]].filter(Boolean), task: '接口联调', date: '昨天' },
    { id: 'c3', members: [projectMembers[0], projectMembers[2], projectMembers[3]].filter(Boolean), task: '需求讨论会', date: '3 天前' },
  ]

  return (
    <div className="space-y-6 max-w-[1200px]">
      {/* ---- Breadcrumb ---- */}
      <nav className="flex items-center gap-1.5 text-sm text-on-surface-variant">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <Icon name="home" className="!text-[18px]" />
          首页
        </Link>
        <Icon name="chevron_right" className="!text-[16px] text-on-surface-variant/60" />
        <Link href="/projects" className="hover:text-primary transition-colors">
          项目
        </Link>
        <Icon name="chevron_right" className="!text-[16px] text-on-surface-variant/60" />
        <span className="text-on-surface font-medium">{project.name}</span>
      </nav>

      {/* ---- Page Header ---- */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-on-surface">{project.name}</h1>
          <Badge className={cn('text-xs border px-2.5 py-0.5', statusInfo.cls)}>{statusInfo.label}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Icon name="edit" className="!text-[16px]" />
            编辑项目
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Icon name="share" className="!text-[16px]" />
            分享
          </Button>
        </div>
      </div>

      {/* ---- Tabs ---- */}
      <Tabs defaultValue="overview" className="space-y-5">
        <TabsList>
          <TabsTrigger value="overview" className="gap-1.5">
            <Icon name="grid_view" className="!text-[18px]" />
            概览
          </TabsTrigger>
          <TabsTrigger value="tasks" className="gap-1.5">
            <Icon name="checklist" className="!text-[18px]" />
            任务列表
          </TabsTrigger>
          <TabsTrigger value="members" className="gap-1.5">
            <Icon name="group" className="!text-[18px]" />
            成员
          </TabsTrigger>
          <TabsTrigger value="timeline" className="gap-1.5">
            <Icon name="timeline" className="!text-[18px]" />
            时间线
          </TabsTrigger>
        </TabsList>

        {/* ========== OVERVIEW TAB ========== */}
        <TabsContent value="overview" className="space-y-5">
          {/* Metric cards */}
          <div className="grid grid-cols-4 gap-4">
            <MetricCard icon="trending_up" label="进度" value={`${project.progress}%`} color="blue" />
            <MetricCard icon="task_alt" label="任务完成" value={`${doneTasks}/${tasks.length}`} color="green" />
            <MetricCard icon="event" label="截止日期" value={project.endDate} color="amber" />
            <MetricCard icon="person" label="负责人" value={owner?.name || '-'} color="purple" />
          </div>

          {/* Main content area: table + sidebar */}
          <div className="grid grid-cols-[1fr_320px] gap-5">
            {/* Task table */}
            <Card className="ring-1 ring-outline-variant/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="checklist" className="!text-[20px] text-primary" />
                  任务列表
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-on-surface-variant text-left border-b border-outline-variant/30">
                      <th className="pb-3 font-medium">任务名称</th>
                      <th className="pb-3 font-medium">状态</th>
                      <th className="pb-3 font-medium">优先级</th>
                      <th className="pb-3 font-medium">负责人</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => {
                      const tsInfo = taskStatusBadge[task.status] || taskStatusBadge.todo
                      return (
                        <tr key={task.id} className="border-b border-outline-variant/15 last:border-0 hover:bg-surface-container/50 transition-colors">
                          <td className="py-3 font-medium text-on-surface">{task.title}</td>
                          <td className="py-3">
                            <Badge className={cn('text-xs border', tsInfo.cls)}>{tsInfo.label}</Badge>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-1.5">
                              <div className={cn('w-2 h-2 rounded-full', priorityDot[task.priority])} />
                              <span className="text-on-surface-variant">
                                {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 text-on-surface-variant">
                            {members.find((m) => m.id === task.assigneeId)?.name || '-'}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Right sidebar */}
            <div className="space-y-5">
              {/* Project image card */}
              <Card className="ring-1 ring-outline-variant/40 overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-primary/80 to-tertiary/60">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs text-on-surface-variant">项目描述</p>
                    <p className="text-sm text-on-surface font-medium mt-1 line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </Card>

              {/* Milestones mini-timeline */}
              <Card className="ring-1 ring-outline-variant/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Icon name="flag" className="!text-[18px] text-primary" />
                    里程碑
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMilestones.map((m, i) => (
                      <div key={m.id} className="flex items-start gap-3 relative">
                        {/* Vertical line */}
                        {i < mockMilestones.length - 1 && (
                          <div className="absolute left-[7px] top-5 w-0.5 h-[calc(100%+4px)] bg-outline-variant/40" />
                        )}
                        {/* Dot */}
                        <div className="shrink-0 mt-0.5">
                          {m.status === 'completed' ? (
                            <div className="w-[14px] h-[14px] rounded-full bg-primary flex items-center justify-center">
                              <Icon name="check" className="!text-[10px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }} />
                            </div>
                          ) : m.status === 'active' ? (
                            <div className="w-[14px] h-[14px] rounded-full border-2 border-primary bg-primary/20 animate-pulse" />
                          ) : (
                            <div className="w-[14px] h-[14px] rounded-full border-2 border-outline-variant bg-surface" />
                          )}
                        </div>
                        {/* Text */}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-on-surface-variant">{m.date}</p>
                          <p className={cn('text-sm font-medium', m.status === 'upcoming' ? 'text-on-surface-variant' : 'text-on-surface')}>
                            {m.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ========== TASK LIST TAB ========== */}
        <TabsContent value="tasks" className="space-y-4">
          <Card className="ring-1 ring-outline-variant/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="checklist" className="!text-[20px] text-primary" />
                任务列表
                <Badge variant="secondary" className="ml-1">{tasks.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-on-surface-variant text-left border-b border-outline-variant/30">
                    <th className="p-4 font-medium">任务名称</th>
                    <th className="p-4 font-medium">状态</th>
                    <th className="p-4 font-medium">优先级</th>
                    <th className="p-4 font-medium">负责人</th>
                    <th className="p-4 font-medium">截止日期</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => {
                    const tsInfo = taskStatusBadge[task.status] || taskStatusBadge.todo
                    return (
                      <tr key={task.id} className="border-b border-outline-variant/15 last:border-0 hover:bg-surface-container/50 transition-colors">
                        <td className="p-4 font-medium text-on-surface">{task.title}</td>
                        <td className="p-4">
                          <Badge className={cn('text-xs border', tsInfo.cls)}>{tsInfo.label}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5">
                            <div className={cn('w-2 h-2 rounded-full', priorityDot[task.priority])} />
                            <span className="text-on-surface-variant">
                              {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-on-surface-variant">{members.find((m) => m.id === task.assigneeId)?.name || '-'}</td>
                        <td className="p-4 text-on-surface-variant">{task.dueDate}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========== MEMBERS TAB ========== */}
        <TabsContent value="members" className="space-y-5">
          {/* Header with search + add */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Icon name="search" className="!text-[20px] absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="搜索成员..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full h-9 pl-10 pr-4 rounded-xl bg-surface-container ring-1 ring-outline-variant/40 text-sm text-on-surface placeholder:text-on-surface-variant focus:ring-primary/50 focus:outline-none transition-all"
              />
            </div>
            <Button size="sm" className="gap-1.5">
              <Icon name="person_add" className="!text-[16px]" />
              添加成员
            </Button>
          </div>

          {/* Member grid */}
          <div className="grid grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="flex flex-col items-center py-12 gap-2">
              <Icon name="person_off" className="!text-[40px] text-on-surface-variant" />
              <p className="text-on-surface-variant">未找到匹配的成员</p>
            </div>
          )}

          {/* Bottom section: collaborations + stats */}
          <div className="grid grid-cols-[1fr_1fr] gap-5 mt-6">
            {/* Recent collaborations */}
            <Card className="ring-1 ring-outline-variant/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Icon name="handshake" className="!text-[18px] text-primary" />
                  最近协作
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {collaborations.map((c) => (
                  <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container/50 hover:bg-surface-container transition-colors">
                    <div className="flex -space-x-2">
                      {c.members.map((m) => (
                        <div
                          key={m.id}
                          className="w-8 h-8 rounded-full bg-primary-container border-2 border-surface flex items-center justify-center text-on-primary-container text-xs font-semibold"
                        >
                          {m.name[0]}
                        </div>
                      ))}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-on-surface truncate">{c.task}</p>
                      <p className="text-xs text-on-surface-variant">{c.members.map((m) => m.name).join('、')}</p>
                    </div>
                    <span className="text-xs text-on-surface-variant shrink-0">{c.date}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team statistics */}
            <Card className="ring-1 ring-outline-variant/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Icon name="bar_chart" className="!text-[18px] text-primary" />
                  团队统计
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">团队人数</span>
                  <span className="font-semibold text-on-surface">{projectMembers.length} 人</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">任务总数</span>
                  <span className="font-semibold text-on-surface">{tasks.length} 个</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">已完成</span>
                  <span className="font-semibold text-green-600">{doneTasks} 个</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">进行中</span>
                  <span className="font-semibold text-blue-600">{tasks.filter((t) => t.status === 'in-progress').length} 个</span>
                </div>
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-on-surface-variant">完成率</span>
                    <span className="text-xs font-medium text-primary">{tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0}%` }}
                    />
                  </div>
                </div>
                {/* Role distribution */}
                <div className="pt-2 space-y-2">
                  <p className="text-xs text-on-surface-variant font-medium">角色分布</p>
                  {(['manager', 'developer', 'designer', 'tester'] as const).map((role) => {
                    const count = projectMembers.filter((m) => m.role === role).length
                    if (count === 0) return null
                    return (
                      <div key={role} className="flex items-center gap-2">
                        <Badge className={cn('text-xs border', roleColors[role])}>{roleLabels[role]}</Badge>
                        <span className="text-xs text-on-surface-variant">{count} 人</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ========== TIMELINE TAB ========== */}
        <TabsContent value="timeline" className="space-y-5">
          <Card className="ring-1 ring-outline-variant/40 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="timeline" className="!text-[20px] text-primary" />
                项目里程碑
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Decorative background circles */}
              <div className="relative py-6">
                <div className="absolute top-10 -left-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 -right-10 w-48 h-48 rounded-full bg-tertiary/5 blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

                {/* Vertical center line */}
                <div className="absolute left-1/2 top-6 bottom-6 w-0.5 bg-outline-variant/30 -translate-x-1/2" />

                {/* Milestones */}
                <div className="relative space-y-8 flex flex-col items-center">
                  {mockMilestones.map((milestone, i) => (
                    <TimelineItem key={milestone.id} milestone={milestone} index={i} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
