// app/dashboard/notifications/page.tsx
"use client"

import { useEffect, useState } from "react"

interface Notification {
  id: number
  message: string
  date: string
  read: boolean
}

const mockNotifications: Notification[] = [
  { id: 1, message: "Your SDG Awareness Training is completed!", date: "2025-11-02 10:30", read: false },
  { id: 2, message: "New community internship available near you.", date: "2025-11-01 14:00", read: true },
  { id: 3, message: "Certificate for Project Management Workshop issued.", date: "2025-10-30 09:45", read: false },
  { id: 4, message: "Reminder: Complete your Digital Volunteering module.", date: "2025-10-28 12:00", read: true },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    setNotifications(mockNotifications)
  }, [])

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notifications</h1>

      <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 max-h-[500px] overflow-y-auto space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex justify-between items-center p-4 rounded-xl cursor-pointer transition transform hover:scale-105 hover:bg-white/10 ${notif.read ? "bg-white/10" : "bg-white/20"
              }`}
            onClick={() => markAsRead(notif.id)}
          >
            <div className="space-y-1">
              <p className="text-white/90">{notif.message}</p>
              <p className="text-white/40 text-xs">{notif.date}</p>
            </div>
            {!notif.read && <span className="w-3 h-3 bg-[#00ADEF] rounded-full" />}
          </div>
        ))}
      </div>
    </div>
  )
}
