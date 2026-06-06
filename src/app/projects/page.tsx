'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useProjectStore } from '@/stores/project-store'
import { useMemberStore } from '@/stores/member-store'
import { useTaskStore } from '@/stores/task-store'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const statusLabels: Record<string, string> = {
  active: '进行中',
  completed: '已完成',
  archived: '已归档',
}

const statusColors: Record<string, string> = {
  active: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  archived: 'bg-gray-100 text-gray-600',
}

export default function ProjectsPage() {
  const projects = useProjectStore((s) => s.projects)
  const members = useMemberStore((s) => s.members)
  const tasks = useTaskStore((s) => s.tasks)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">全部项目</h2>
        <Button className="bg-[#3b5998] hover:bg-[#3b5998]/90">
          <Plus size={16} className="mr-1" /> 新建项目
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => {
          const projectTasks = tasks.filter((t) => t.projectId === project.id)
          const projectMembers = members.filter((m) => project.memberIds.includes(m.id))
          return (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    <Badge className={statusColors[project.status]}>{statusLabels[project.status]}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">进度</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {projectMembers.slice(0, 4).map((m) => (
                        <div
                          key={m.id}
                          className="w-7 h-7 rounded-full bg-[#3b5998] border-2 border-white flex items-center justify-center text-white text-[10px] font-semibold"
                        >
                          {m.name[0]}
                        </div>
                      ))}
                      {projectMembers.length > 4 && (
                        <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-500 text-[10px]">
                          +{projectMembers.length - 4}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{projectTasks.length} 个任务</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
