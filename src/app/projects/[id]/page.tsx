'use client'

import { use } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useProjectStore } from '@/stores/project-store'
import { useMemberStore } from '@/stores/member-store'
import { useTaskStore } from '@/stores/task-store'
import Link from 'next/link'
import { ChevronRight, Calendar, User, ListChecks, Clock, CheckCircle2, Circle, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const priorityDot: Record<string, string> = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-green-500',
}

const timelineEvents = [
  { date: '2026-03-01', title: '项目启动', desc: '项目正式立项，确定技术方案', done: true },
  { date: '2026-04-01', title: '需求评审', desc: '完成需求文档评审和确认', done: true },
  { date: '2026-05-01', title: '设计完成', desc: 'UI 设计稿通过评审', done: true },
  { date: '2026-06-15', title: '核心开发', desc: '完成核心功能模块开发', done: false },
  { date: '2026-07-15', title: '测试验收', desc: '功能测试和 Bug 修复', done: false },
  { date: '2026-07-31', title: '项目上线', desc: '部署上线并交付', done: false },
]

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = useProjectStore((s) => s.getProjectById(id))
  const members = useMemberStore((s) => s.members)
  const tasks = useTaskStore((s) => s.getTasksByProject(id))

  if (!project) {
    return <div className="text-center py-20 text-gray-500">项目不存在</div>
  }

  const projectMembers = members.filter((m) => project.memberIds.includes(m.id))
  const roleLabels: Record<string, string> = {
    manager: '项目经理', developer: '开发工程师', designer: '设计师', tester: '测试工程师',
  }

  return (
    <div className="space-y-6">
      {/* 面包屑 + 标题 */}
      <div>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <Link href="/projects" className="hover:text-[#3b5998]">项目</Link>
          <ChevronRight size={14} />
          <span className="text-gray-700">{project.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
          <Badge className="bg-blue-100 text-blue-700">
            {project.status === 'active' ? '进行中' : project.status === 'completed' ? '已完成' : '已归档'}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="tasks">任务列表</TabsTrigger>
          <TabsTrigger value="members">成员</TabsTrigger>
          <TabsTrigger value="timeline">时间线</TabsTrigger>
        </TabsList>

        {/* 概览 */}
        <TabsContent value="overview" className="space-y-4">
          <p className="text-gray-600">{project.description}</p>
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><ListChecks size={18} className="text-blue-600" /></div>
                <div><p className="text-xs text-gray-500">进度</p><p className="font-bold">{project.progress}%</p></div>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><CheckCircle2 size={18} className="text-green-600" /></div>
                <div><p className="text-xs text-gray-500">任务</p><p className="font-bold">{tasks.filter(t => t.status === 'done').length}/{tasks.length}</p></div>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><Calendar size={18} className="text-amber-600" /></div>
                <div><p className="text-xs text-gray-500">截止日期</p><p className="font-bold text-sm">{project.endDate}</p></div>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center"><User size={18} className="text-purple-600" /></div>
                <div><p className="text-xs text-gray-500">负责人</p><p className="font-bold text-sm">{members.find(m => m.id === project.ownerId)?.name}</p></div>
              </CardContent>
            </Card>
          </div>
          <Card className="border-gray-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm">总体进度</CardTitle></CardHeader>
            <CardContent><Progress value={project.progress} className="h-3" /></CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardHeader className="pb-2"><CardTitle className="text-sm">任务列表</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-left border-b">
                    <th className="pb-2 font-medium">任务</th>
                    <th className="pb-2 font-medium">状态</th>
                    <th className="pb-2 font-medium">优先级</th>
                    <th className="pb-2 font-medium">负责人</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b last:border-0">
                      <td className="py-2.5">{task.title}</td>
                      <td className="py-2.5">
                        <Badge variant="outline" className="text-xs">
                          {task.status === 'todo' ? '待办' : task.status === 'in-progress' ? '进行中' : '已完成'}
                        </Badge>
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className={cn('w-2 h-2 rounded-full', priorityDot[task.priority])} />
                          <span>{task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}</span>
                        </div>
                      </td>
                      <td className="py-2.5">{members.find(m => m.id === task.assigneeId)?.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 任务列表 */}
        <TabsContent value="tasks">
          <Card className="border-gray-200">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead><tr className="text-gray-500 text-left border-b"><th className="p-4 font-medium">任务名称</th><th className="p-4 font-medium">状态</th><th className="p-4 font-medium">优先级</th><th className="p-4 font-medium">负责人</th><th className="p-4 font-medium">截止日期</th></tr></thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="p-4 font-medium">{task.title}</td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{task.status === 'todo' ? '待办' : task.status === 'in-progress' ? '进行中' : '已完成'}</Badge></td>
                      <td className="p-4"><div className="flex items-center gap-1.5"><div className={cn('w-2 h-2 rounded-full', priorityDot[task.priority])} />{task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}</div></td>
                      <td className="p-4">{members.find(m => m.id === task.assigneeId)?.name}</td>
                      <td className="p-4 text-gray-400">{task.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 成员 */}
        <TabsContent value="members">
          <div className="grid grid-cols-3 gap-4">
            {projectMembers.map((member) => (
              <Card key={member.id} className="border-gray-200">
                <CardContent className="p-5 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#3b5998] mx-auto flex items-center justify-center text-white text-xl font-semibold">
                    {member.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{member.name}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">{roleLabels[member.role]}</Badge>
                  </div>
                  <p className="text-sm text-gray-400">{member.email}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 时间线 */}
        <TabsContent value="timeline">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gray-200" />
            {timelineEvents.map((event, i) => (
              <div key={i} className={cn('relative flex mb-8', i % 2 === 0 ? 'flex-row' : 'flex-row-reverse')}>
                <div className={cn('w-1/2 px-4', i % 2 === 0 ? 'text-right' : 'text-left')}>
                  <Card className="inline-block border-gray-200">
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-400 mb-1">{event.date}</p>
                      <p className="font-semibold text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{event.desc}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center z-10"
                  style={{ top: '12px' }}>
                  {event.done ? (
                    <CheckCircle2 size={20} className="text-green-500" />
                  ) : (
                    <Circle size={20} className="text-gray-300" />
                  )}
                </div>
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
