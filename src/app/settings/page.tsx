'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSettingsStore } from '@/stores/settings-store'
import { useState } from 'react'

export default function SettingsPage() {
  const settings = useSettingsStore((s) => s.settings)
  const updateSettings = useSettingsStore((s) => s.updateSettings)

  const [username, setUsername] = useState(settings.username)
  const [email, setEmail] = useState(settings.email)

  const handleSaveProfile = () => {
    updateSettings({ username, email })
  }

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    updateSettings({
      notifications: { ...settings.notifications, [key]: !settings.notifications[key] },
    })
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* 个人资料 */}
      <Card className="border-gray-200">
        <CardHeader><CardTitle className="text-base">个人资料</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#3b5998] flex items-center justify-center text-white text-2xl font-semibold">
              {username[0]}
            </div>
            <Button variant="outline" size="sm">更换头像</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">用户名</label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">邮箱</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="w-1/2">
            <label className="text-sm font-medium text-gray-700 block mb-1">角色</label>
            <Input value={settings.role} disabled />
          </div>
          <Button onClick={handleSaveProfile} className="bg-[#3b5998] hover:bg-[#3b5998]/90">保存修改</Button>
        </CardContent>
      </Card>

      {/* 通知设置 */}
      <Card className="border-gray-200">
        <CardHeader><CardTitle className="text-base">通知设置</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'email' as const, label: '邮件通知' },
            { key: 'taskAssignment' as const, label: '任务分配提醒' },
            { key: 'deadline' as const, label: '截止日期提醒' },
            { key: 'projectUpdate' as const, label: '项目更新通知' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{item.label}</span>
              <button
                onClick={() => toggleNotification(item.key)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings.notifications[item.key] ? 'bg-[#3b5998]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    settings.notifications[item.key] ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 外观设置 */}
      <Card className="border-gray-200">
        <CardHeader><CardTitle className="text-base">外观设置</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">主题</label>
            <div className="flex gap-3">
              {(['light', 'dark', 'system'] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => updateSettings({ theme })}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    settings.theme === theme
                      ? 'border-[#3b5998] bg-[#3b5998]/10 text-[#3b5998] font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '跟随系统'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">语言</label>
            <select
              value={settings.language}
              onChange={(e) => updateSettings({ language: e.target.value as 'zh-CN' | 'en-US' })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3b5998]"
            >
              <option value="zh-CN">中文（简体）</option>
              <option value="en-US">English</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 危险区域 */}
      <Card className="border-red-200">
        <CardHeader><CardTitle className="text-base text-red-600">危险区域</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-3">删除账户后，所有数据将无法恢复。请谨慎操作。</p>
          <Button variant="destructive">删除账户</Button>
        </CardContent>
      </Card>
    </div>
  )
}
