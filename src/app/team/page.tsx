'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useMemberStore } from '@/stores/member-store'
import { cn } from '@/lib/utils'

const roleLabels: Record<string, string> = {
  manager: '项目经理',
  developer: '前端开发',
  designer: 'UI设计师',
  tester: '测试工程师',
}

const roleColors: Record<string, string> = {
  manager: 'bg-red-50 text-red-700',
  developer: 'bg-green-50 text-green-700',
  designer: 'bg-purple-50 text-purple-700',
  tester: 'bg-amber-50 text-amber-700',
}

const statusColors: Record<string, string> = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  offline: 'bg-gray-400',
}

const recentCollaborations = [
  { user1: '张伟', user2: '李芳', task: '首页重构方案评审', time: '2 小时前' },
  { user1: '王强', user2: '赵敏', task: '设计稿交付与反馈', time: '5 小时前' },
  { user1: '刘伟', user2: '孙悦', task: 'API 接口联调测试', time: '昨天' },
]

export default function TeamPage() {
  const members = useMemberStore((s) => s.members)

  // Mock online status
  const memberStatuses: Record<string, 'online' | 'away' | 'offline'> = {
    'm1': 'online',
    'm2': 'online',
    'm3': 'away',
    'm4': 'online',
    'm5': 'offline',
    'm6': 'online',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-[28px] font-semibold text-on-surface">Team Members</h2>
          <p className="text-[14px] text-on-surface-variant mt-1">Manage your team and track collaborations</p>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Add Member
        </button>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-3 gap-5">
        {members.map((member) => (
          <Card key={member.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0px_10px_15px_rgba(0,0,0,0.08)] transition-all">
            <CardContent className="p-6 text-center space-y-3">
              <div className="relative inline-block">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-xl font-semibold mx-auto">
                  {member.name[0]}
                </div>
                <span className={cn(
                  'absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-surface-container-lowest',
                  statusColors[memberStatuses[member.id] || 'offline']
                )} />
              </div>
              <div>
                <p className="font-semibold text-on-surface">{member.name}</p>
                <Badge className={cn('mt-1.5 text-[12px]', roleColors[member.role] || 'bg-surface-container-high text-on-surface-variant')}>
                  {roleLabels[member.role] || member.role}
                </Badge>
              </div>
              <p className="text-[12px] text-on-surface-variant">{member.email}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-5 gap-5">
        {/* Recent Collaborations */}
        <Card className="col-span-3 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-[16px] font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">handshake</span>
              Recent Collaborations
            </h3>
            <div className="space-y-4">
              {recentCollaborations.map((collab, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary-container border-2 border-surface-container-low flex items-center justify-center text-on-primary-container text-xs font-semibold">
                      {collab.user1[0]}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-secondary-container border-2 border-surface-container-low flex items-center justify-center text-on-secondary-container text-xs font-semibold">
                      {collab.user2[0]}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-on-surface">
                      <span className="font-semibold">{collab.user1}</span> & <span className="font-semibold">{collab.user2}</span>
                    </p>
                    <p className="text-[12px] text-on-surface-variant">{collab.task}</p>
                  </div>
                  <span className="text-[12px] text-on-surface-variant shrink-0">{collab.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Statistics */}
        <Card className="col-span-2 bg-primary text-on-primary rounded-xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-[16px] font-semibold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
              Team Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[14px] opacity-80">Active Members</span>
                <span className="text-[20px] font-bold">12/15</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[80%] rounded-full" />
              </div>
              <div className="flex items-center gap-1 text-[14px]">
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
                <span className="font-bold">+24%</span>
                <span className="opacity-70">productivity this week</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <p className="text-[20px] font-bold">28</p>
                  <p className="text-[12px] opacity-70">Tasks Done</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <p className="text-[20px] font-bold">4.2h</p>
                  <p className="text-[12px] opacity-70">Avg Response</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
