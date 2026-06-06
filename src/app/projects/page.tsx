'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useProjectStore } from '@/stores/project-store'
import { useMemberStore } from '@/stores/member-store'
import { useTaskStore } from '@/stores/task-store'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const statusLabels: Record<string, string> = {
  active: 'Active',
  completed: 'Completed',
  archived: 'Archived',
}

const statusColors: Record<string, string> = {
  active: 'bg-secondary-container text-on-secondary-container',
  completed: 'bg-green-100 text-green-700',
  archived: 'bg-surface-container-high text-on-surface-variant',
}

export default function ProjectsPage() {
  const projects = useProjectStore((s) => s.projects)
  const members = useMemberStore((s) => s.members)
  const tasks = useTaskStore((s) => s.tasks)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-[28px] font-semibold text-on-surface">All Projects</h2>
          <p className="text-[14px] text-on-surface-variant mt-1">Manage and track all your team projects</p>
        </div>
        <Button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {projects.map((project) => {
          const projectTasks = tasks.filter((t) => t.projectId === project.id)
          const projectMembers = members.filter((m) => project.memberIds.includes(m.id))
          return (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0px_10px_15px_rgba(0,0,0,0.08)] transition-all cursor-pointer">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-on-surface">{project.name}</h3>
                    <Badge className={statusColors[project.status]}>{statusLabels[project.status]}</Badge>
                  </div>
                  <p className="text-[14px] text-on-surface-variant line-clamp-2">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-on-surface-variant">Progress</span>
                      <span className="font-semibold text-on-surface">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {projectMembers.slice(0, 4).map((m) => (
                        <div
                          key={m.id}
                          className="w-7 h-7 rounded-full bg-primary-container border-2 border-surface-container-lowest flex items-center justify-center text-on-primary-container text-[10px] font-semibold"
                        >
                          {m.name[0]}
                        </div>
                      ))}
                      {projectMembers.length > 4 && (
                        <div className="w-7 h-7 rounded-full bg-surface-container-high border-2 border-surface-container-lowest flex items-center justify-center text-on-surface-variant text-[10px]">
                          +{projectMembers.length - 4}
                        </div>
                      )}
                    </div>
                    <span className="text-[12px] text-on-surface-variant">{projectTasks.length} tasks</span>
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
