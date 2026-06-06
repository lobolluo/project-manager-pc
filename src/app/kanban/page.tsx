'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTaskStore } from '@/stores/task-store'
import { useMemberStore } from '@/stores/member-store'
import { useProjectStore } from '@/stores/project-store'
import type { ITask, TStatus, TPriority } from '@/types'
import { Plus, Search, Filter, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

const columns: { status: TStatus; label: string; color: string; headerBg: string }[] = [
  { status: 'todo', label: '待办', color: 'bg-blue-100 text-blue-700', headerBg: 'bg-blue-50 border-blue-200' },
  { status: 'in-progress', label: '进行中', color: 'bg-amber-100 text-amber-700', headerBg: 'bg-amber-50 border-amber-200' },
  { status: 'done', label: '已完成', color: 'bg-green-100 text-green-700', headerBg: 'bg-green-50 border-green-200' },
]

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

function TaskCard({ task, onEdit }: { task: ITask; onEdit: (task: ITask) => void }) {
  const members = useMemberStore((s) => s.members)
  const projects = useProjectStore((s) => s.projects)
  const assignee = members.find((m) => m.id === task.assigneeId)
  const project = projects.find((p) => p.id === task.projectId)

  return (
    <Card
      className="cursor-pointer border-gray-200 hover:shadow-md transition-shadow group"
      onClick={() => onEdit(task)}
    >
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-gray-800 leading-snug">{task.title}</p>
          <GripVertical size={14} className="text-gray-300 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {project && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {project.name.slice(0, 6)}
            </Badge>
          )}
          {task.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn('w-2 h-2 rounded-full', priorityColors[task.priority])} />
            <span className="text-[10px] text-gray-400">{priorityLabels[task.priority]}优先级</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400">{task.dueDate.slice(5)}</span>
            {assignee && (
              <div className="w-6 h-6 rounded-full bg-[#3b5998] flex items-center justify-center text-white text-[10px] font-semibold">
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
      {/* 工具栏 */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="搜索任务..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterPriority} onValueChange={(v) => setFilterPriority(v ?? 'all')}>
          <SelectTrigger className="w-32">
            <Filter size={14} className="mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部优先级</SelectItem>
            <SelectItem value="high">高优先级</SelectItem>
            <SelectItem value="medium">中优先级</SelectItem>
            <SelectItem value="low">低优先级</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger
            render={(props) => (
              <Button className="bg-[#3b5998] hover:bg-[#3b5998]/90" {...props}>
                <Plus size={16} className="mr-1" /> 新建任务
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
              <Button onClick={handleCreate} className="w-full bg-[#3b5998] hover:bg-[#3b5998]/90">创建</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 看板三列 */}
      <div className="grid grid-cols-3 gap-4">
        {columns.map((col) => (
          <div
            key={col.status}
            className={cn(
              'rounded-xl border-2 border-dashed transition-colors min-h-[400px]',
              dragOverColumn === col.status ? 'border-[#3b5998] bg-[#3b5998]/5' : 'border-transparent'
            )}
            onDragOver={(e) => handleDragOver(e, col.status)}
            onDragLeave={() => setDragOverColumn(null)}
            onDrop={() => handleDrop(col.status)}
          >
            <div className={cn('rounded-t-lg px-4 py-3 border-b', col.headerBg)}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">{col.label}</h3>
                <Badge className={cn('text-xs', col.color)}>
                  {filteredTasks.filter((t) => t.status === col.status).length}
                </Badge>
              </div>
            </div>
            <div className="p-3 space-y-3">
              {filteredTasks
                .filter((t) => t.status === col.status)
                .map((task) => (
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
        ))}
      </div>

      {/* 编辑任务弹窗 */}
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
                <Button onClick={handleEditSave} className="flex-1 bg-[#3b5998] hover:bg-[#3b5998]/90">保存</Button>
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
