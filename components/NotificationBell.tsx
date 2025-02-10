'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { useNotifications } from '@/contexts/NotificationContext'

export default function NotificationBell() {
  const { notifications, removeNotification } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="p-2 text-text hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-highlight rounded-full">
            {notifications.length}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 neumorphic z-20">
          <div className="py-2">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No new notifications</p>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className="px-4 py-2 hover:bg-white hover:neumorphic-inset transition-all duration-300">
                  <p className="text-sm">{notification.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-xs text-highlight hover:underline mt-1"
                  >
                    Dismiss
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

