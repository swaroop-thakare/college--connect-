'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { webSocketService } from '@/lib/websocket'

type Notification = {
  id: number
  type: 'message' | 'announcement' | 'deadline'
  content: string
  timestamp: string
}

type NotificationContextType = {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    webSocketService.on('notification', (data) => {
      addNotification(data)
    })

    return () => {
      webSocketService.off('notification', () => {})
    }
  }, [])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    setNotifications((prev) => [...prev, { ...notification, id: Date.now() }])
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

