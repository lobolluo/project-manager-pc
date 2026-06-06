'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useProjectStore } from '@/stores/project-store'
import { useTaskStore } from '@/stores/task-store'
import { useMemberStore } from '@/stores/member-store'
import {
  FolderKanban,
  ListChecks,
  CheckCircle2,
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react'

export default function DashboardPage() {
  const projects = useProjectStore((s) => s.projects)
  const tasks = useTaskStore((s) => s.tasks)
  const members = useMemberStore((s) => s.members)

  const activeTasks = tasks.filter((t) => t.status !== 'done').length
  const completedTasks = tasks.filter((t) => t.status === 'done').length

  const stats = [
    { title: '项目总数', value: projects.length, icon: FolderKanban, trend: '+2', up: true },
    { title: '进行中任务', value: activeTasks, icon: ListChecks, trend: '+5', up: true },
    { title: '已完成', value: completedTasks, icon: CheckCircle2, trend: '+12', up: true },
    { title: '团队成员', value: members.length, icon: Users, trend: '+1', up: true },
  ]

  const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const weekData = [8, 12, 6, 14, 10, 4, 7]
  const maxVal = Math.max(...weekData)

  const recentActivities = [
    { user: '李四', action: '完成了任务「侧边栏导航」', time: '10 分钟前' },
    { user: '王五', action: '上传了设计稿「移动端启动页」', time: '30 分钟前' },
    { user: '张三', action: '创建了新项目「数据平台 v2」', time: '1 小时前' },
    { user: '赵六', action: '将「表单验证」移入进行中', time: '2 小时前' },
    { user: '吴九', action: '评论了「App 启动页设计」', time: '3 小时前' },
  ]

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-gray-200">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#3b5998]/10 flex items-center justify-center">
                    <Icon size={24} className="text-[#3b5998]" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs">
                  {stat.up ? (
                    <TrendingUp size={14} className="text-green-500" />
                  ) : (
                    <TrendingDown size={14} className="text-red-500" />
                  )}
                  <span className={stat.up ? 'text-green-500' : 'text-red-500'}>{stat.trend}</span>
                  <span className="text-gray-400 ml-1">较上周</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 周进度图表 + 最近活动 */}
      <div className="grid grid-cols-5 gap-4">
        {/* 柱状图 */}
        <Card className="col-span-3 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">本周进度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-48">
              {weekDays.map((day, i) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500">{weekData[i]}</span>
                  <div
                    className="w-full bg-[#3b5998] rounded-t-md transition-all"
                    style={{ height: `${(weekData[i] / maxVal) * 100}%` }}
                  />
                  <span className="text-xs text-gray-400">{day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 最近活动 */}
        <Card className="col-span-2 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {activity.user[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
