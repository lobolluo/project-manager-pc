'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTaskStore } from '@/stores/task-store'
import { useMemberStore } from '@/stores/member-store'
import { useProjectStore } from '@/stores/project-store'
import type { ITask, TStatus, TPriority } from '@/types'
import { cn } from '@/lib/utils'

const columns: { status: TStatus; label: string; icon: string; borderColor: string; headerBg: string; badgeColor: string }[] = [
  { status: 'todo', label: '待办', icon: 'view_column', borderColor: 'border-blue-400', headerBg: 'bg-blue-50 border-blue-200', badgeColor: 'bg-blue-100 text-blue-700' },
  { status: 'in-progress', label: '进行中', icon: 'pending', borderColor: 'border-amber-400', headerBg: 'bg-amber-50 border-amber-200', badgeColor: 'bg-amber-100 text-amber-700' },
  { status: 'done', label: '已完成', icon: 'check_circle', borderColor: 'border-green-400', headerBg: 'bg-green-50 border-green-200', badgeColor: 'bg-green-100 text-green-700' },
]

const categoryColors: Record<string, { border: string; bg: string; text: string }> = {
  'Website': { border: 'border-l-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
  'Marketing': { border: 'border-l-purple-500', bg: 'bg-purple-50', text: 'text-purple-700' },
  'App': { border: 'border-l-green-500', bg: 'bg-green-50', text: 'text-green-700' },
  'Design': { border: 'border-l-pink-500', bg: 'bg-pink-50', text: 'text-pink-700' },
}

const defaultCategoryColor = { border: 'border-l-gray-400', bg: 'bg-gray-50', text: 'text-gray-700' }

const priorityColors: Record<TPriority, string> = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-green-500',
}

const priorityLabels: Record<TPriority, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

function getCategoryForProject(projectName: string): string {
  const name = projectName.toLowerCase()
  if (name.includes('前端') || name.includes('网站') || name.includes('web')) return 'Website'
  if (name.includes('营销') || name.includes('marketing')) return 'Marketing'
  if (name.includes('app') || name.includes('移动') || name.includes('应用')) return 'App'
  if (name.includes('设计') || name.includes('design')) return 'Design'
  return 'Website'
}

function TaskCard({ task, onEdit }: { task: ITask; onEdit: (task: ITask) => void }) {
  const members = useMemberStore((s) => s.members)
  const projects = useProjectStore((s) => s.projects)
  const assignee = members.find((m) => m.id === task.assigneeId)
  const project = projects.find((p) => p.id === task.projectId)

  const category = project ? getCategoryForProject(project.name) : 'Website'
  const colors = categoryColors[category] ?? defaultCategoryColor

  return (
    <Card
      className={cn(
        'cursor-pointer border-0 border-l-4 rounded-lg shadow-sm hover:shadow-md transition-all bg-surface-container-lowest',
        colors.border
      )}
      onClick={() => onEdit(task)}
    >
      <CardContent className="p-3 space-y-2">
        {/* Category tag */}
        <div>
          <Badge className={cn('text-[10px] px-1.5 py-0 border-0 font-medium', colors.bg, colors.text)}>
            {category}
          </Badge>
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-on-surface leading-snug">{task.title}</p>

        {/* Bottom row: priority + due date + avatar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className={cn('w-2 h-2 rounded-full shrink-0', priorityColors[task.priority])} />
            <span className="text-[10px] text-on-surface-variant">{priorityLabels[task.priority]}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-on-surface-variant">{task.dueDate.slice(5)}</span>
            {assignee && (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary text-[10px] font-semibold">
                {assignee.name[0]}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function KanbanPage() {
  const tasks = useTaskStore((s) => s.tasks)
  const addTask = useTaskStore((s) => s.addTask)
  const updateTask = useTaskStore((s) => s.updateTask)
  const moveTask = useTaskStore((s) => s.moveTask)
  const members = useMemberStore((s) => s.members)
  const projects = useProjectStore((s) => s.projects)

  const [search, setSearch] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<TStatus | null>(null)
  const [editingTask, setEditingTask] = useState<ITask | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  const [newTitle, setNewTitle] = useState('')
  const [newPriority, setNewPriority] = useState<TPriority>('medium')
  const [newProjectId, setNewProjectId] = useState(projects[0]?.id ?? '')
  const [newAssigneeId, setNewAssigneeId] = useState(members[0]?.id ?? '')
  const [newDueDate, setNewDueDate] = useState('2026-07-01')

  const filteredTasks = tasks.filter((t) => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false
    return true
  })

  const handleDragStart = (taskId: string) => setDraggedTask(taskId)

  const handleDragOver = (e: React.DragEvent, status: TStatus) => {
    e.preventDefault()
    setDragOverColumn(status)
  }

  const handleDrop = (status: TStatus) => {
    if (draggedTask) {
      moveTask(draggedTask, status)
    }
    setDraggedTask(null)
    setDragOverColumn(null)
  }

  const handleCreate = () => {
    if (!newTitle.trim()) return
    const id = `t${Date.now()}`
    addTask({
      id,
      title: newTitle,
      status: 'todo',
      priority: newPriority,
      projectId: newProjectId,
      assigneeId: newAssigneeId,
      dueDate: newDueDate,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    setNewTitle('')
    setCreateOpen(false)
  }

  const handleEditSave = () => {
    if (!editingTask) return
    updateTask(editingTask.id, {
      title: editingTask.title,
      priority: editingTask.priority,
      dueDate: editingTask.dueDate,
      description: editingTask.description,
    })
    setEditingTask(null)
  }

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-surface-container-lowest rounded-xl px-5 py-3 border border-outline-variant">
        <h1 className="text-xl font-semibold text-on-surface">Project Workspace</h1>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <Input
              placeholder="搜索任务..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-56 bg-surface-container-low border-outline-variant"
            />
          </div>

          {/* Filter */}
          <Select value={filterPriority} onValueChange={(v) => setFilterPriority(v ?? 'all')}>
            <SelectTrigger className="w-36 bg-surface-container-low border-outline-variant">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant mr-1">filter_list</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部优先级</SelectItem>
              <SelectItem value="high">高优先级</SelectItem>
              <SelectItem value="medium">中优先级</SelectItem>
              <SelectItem value="low">低优先级</SelectItem>
            </SelectContent>
          </Select>

          {/* Add Task */}
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger
              render={(props) => (
                <Button className="bg-primary text-on-primary hover:bg-primary/90" {...props}>
                  <span className="material-symbols-outlined text-[18px] mr-1">add</span>
                  添加任务
                </Button>
              )}
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新建任务</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <Input placeholder="任务标题" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                <div className="grid grid-cols-2 gap-3">
                  <Select value={newPriority} onValueChange={(v) => setNewPriority(v as TPriority)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">高优先级</SelectItem>
                      <SelectItem value="medium">中优先级</SelectItem>
                      <SelectItem value="low">低优先级</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Select value={newProjectId} onValueChange={(v) => v && setNewProjectId(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {projects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={newAssigneeId} onValueChange={(v) => v && setNewAssigneeId(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {members.map((m) => (
                        <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreate} className="w-full bg-primary text-on-primary hover:bg-primary/90">创建</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-3 gap-4">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.status)
          return (
            <div
              key={col.status}
              className={cn(
                'rounded-xl border-2 border-dashed transition-colors min-h-[400px]',
                dragOverColumn === col.status
                  ? 'border-primary bg-primary/5'
                  : 'border-outline-variant'
              )}
              onDragOver={(e) => handleDragOver(e, col.status)}
              onDragLeave={() => setDragOverColumn(null)}
              onDrop={() => handleDrop(col.status)}
            >
              {/* Column Header */}
              <div className={cn('rounded-t-lg px-4 py-3 border-b', col.headerBg)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">{col.icon}</span>
                    <h3 className="font-semibold text-on-surface">{col.label}</h3>
                  </div>
                  <Badge className={cn('text-xs border-0', col.badgeColor)}>
                    {colTasks.length}
                  </Badge>
                </div>
              </div>

              {/* Task Cards */}
              <div className="p-3 space-y-3">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <TaskCard task={task} onEdit={setEditingTask} />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑任务</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <div className="space-y-4 pt-2">
              <Input
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
              />
              <Input
                placeholder="描述（可选）"
                value={editingTask.description ?? ''}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <Select value={editingTask.priority} onValueChange={(v) => setEditingTask({ ...editingTask, priority: v as TPriority })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">高优先级</SelectItem>
                    <SelectItem value="medium">中优先级</SelectItem>
                    <SelectItem value="low">低优先级</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={editingTask.dueDate}
                  onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleEditSave} className="flex-1 bg-primary text-on-primary hover:bg-primary/90">保存</Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    useTaskStore.getState().deleteTask(editingTask.id)
                    setEditingTask(null)
                  }}
                >
                  删除
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
