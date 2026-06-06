'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSettingsStore } from '@/stores/settings-store'
import { useState } from 'react'

const NOTIFICATION_ITEMS = [
  {
    key: 'email' as const,
    icon: 'mail',
    label: 'Email Notifications',
    description: 'Receive email updates for important activities',
  },
  {
    key: 'taskAssignment' as const,
    icon: 'assignment_ind',
    label: 'Task Assignment Alerts',
    description: 'Get notified when tasks are assigned to you',
  },
  {
    key: 'deadline' as const,
    icon: 'schedule',
    label: 'Deadline Reminders',
    description: 'Reminders before task deadlines approach',
  },
  {
    key: 'projectUpdate' as const,
    icon: 'update',
    label: 'Project Updates',
    description: 'Notifications about project status changes',
  },
]

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
    <div className="max-w-5xl space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-on-surface">Settings</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main column (8-col) */}
        <div className="col-span-8 space-y-6">
          {/* Profile Section */}
          <Card className="border-outline-variant bg-surface-container-lowest">
            <CardHeader>
              <CardTitle className="text-on-surface">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar with camera overlay */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-semibold">
                    {username[0]}
                  </div>
                  <button className="absolute inset-0 w-24 h-24 rounded-full bg-on-surface/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="material-symbols-outlined text-white text-2xl">
                      photo_camera
                    </span>
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium text-on-surface">Profile Photo</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Click the avatar to upload a new photo
                  </p>
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-on-surface block mb-1.5">
                    Username
                  </label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-surface-container-lowest border-outline-variant"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-on-surface block mb-1.5">
                    Role
                  </label>
                  <Input
                    value={settings.role}
                    disabled
                    className="bg-surface-container-low border-outline-variant"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-on-surface block mb-1.5">
                    Email
                  </label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-surface-container-lowest border-outline-variant"
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveProfile}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card className="border-outline-variant bg-surface-container-lowest">
            <CardHeader>
              <CardTitle className="text-on-surface">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {NOTIFICATION_ITEMS.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-3 border-b border-outline-variant last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant mt-0.5">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-on-surface">{item.label}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{item.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotification(item.key)}
                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
                      settings.notifications[item.key] ? 'bg-primary' : 'bg-surface-container-high'
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
        </div>

        {/* Sidebar column (4-col) */}
        <div className="col-span-4 space-y-6">
          {/* Appearance Section */}
          <Card className="border-outline-variant bg-surface-container-lowest">
            <CardHeader>
              <CardTitle className="text-on-surface">Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Theme Mode */}
              <div>
                <label className="text-sm font-medium text-on-surface block mb-2">Theme Mode</label>
                <div className="space-y-2">
                  {[
                    {
                      value: 'light' as const,
                      label: 'Light',
                      preview: (
                        <div className="w-full h-10 rounded-md bg-white border border-outline-variant overflow-hidden p-1.5 space-y-1">
                          <div className="h-1.5 w-8 rounded-sm bg-surface-container-high" />
                          <div className="flex gap-1">
                            <div className="h-2 flex-1 rounded-sm bg-primary/20" />
                            <div className="h-2 flex-1 rounded-sm bg-surface-container" />
                          </div>
                          <div className="h-1 w-12 rounded-sm bg-surface-container-high" />
                        </div>
                      ),
                    },
                    {
                      value: 'dark' as const,
                      label: 'Dark',
                      preview: (
                        <div className="w-full h-10 rounded-md bg-[#1a1c1e] border border-[#44474f] overflow-hidden p-1.5 space-y-1">
                          <div className="h-1.5 w-8 rounded-sm bg-[#44474f]" />
                          <div className="flex gap-1">
                            <div className="h-2 flex-1 rounded-sm bg-[#3b5998]/40" />
                            <div className="h-2 flex-1 rounded-sm bg-[#2d3133]" />
                          </div>
                          <div className="h-1 w-12 rounded-sm bg-[#44474f]" />
                        </div>
                      ),
                    },
                    {
                      value: 'system' as const,
                      label: 'System',
                      preview: (
                        <div className="w-full h-10 rounded-md overflow-hidden flex border border-outline-variant">
                          <div className="w-1/2 bg-white p-1.5 space-y-1 border-r border-outline-variant">
                            <div className="h-1.5 w-6 rounded-sm bg-surface-container-high" />
                            <div className="h-1.5 w-full rounded-sm bg-surface-container" />
                          </div>
                          <div className="w-1/2 bg-[#1a1c1e] p-1.5 space-y-1">
                            <div className="h-1.5 w-6 rounded-sm bg-[#44474f]" />
                            <div className="h-1.5 w-full rounded-sm bg-[#2d3133]" />
                          </div>
                        </div>
                      ),
                    },
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => updateSettings({ theme: theme.value })}
                      className={`w-full text-left p-2.5 rounded-xl border-2 transition-all ${
                        settings.theme === theme.value
                          ? 'border-primary bg-primary/5'
                          : 'border-outline-variant hover:border-outline bg-surface-container-lowest'
                      }`}
                    >
                      {theme.preview}
                      <p
                        className={`text-xs mt-1.5 font-medium ${
                          settings.theme === theme.value ? 'text-primary' : 'text-on-surface-variant'
                        }`}
                      >
                        {theme.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="text-sm font-medium text-on-surface block mb-1.5">Language</label>
                <div className="relative">
                  <select
                    value={settings.language}
                    onChange={(e) => updateSettings({ language: e.target.value as 'zh-CN' | 'en-US' })}
                    className="w-full appearance-none h-9 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 pr-8 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                  >
                    <option value="zh-CN">中文（简体）</option>
                    <option value="en-US">English</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/40 bg-surface-container-lowest">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <span className="material-symbols-outlined">warning</span>
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-on-surface-variant">
                Once you delete your account, there is no going back. All your data, projects, and
                tasks will be permanently removed.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
