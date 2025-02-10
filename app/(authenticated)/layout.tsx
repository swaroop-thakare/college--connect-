"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/Navigation"
import { ThemeProvider } from "@/components/ThemeProvider"
import { NotificationProvider } from "@/contexts/NotificationContext"
import NotificationBell from "@/components/NotificationBell"
import { useAuth } from "@/contexts/AuthContext"
import type React from "react" // Added import for React

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className="flex h-screen">
          <Navigation />
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-[#2a2a2a] shadow-sm z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                  <h1 className="text-xl font-bold text-purple-400">College Connect</h1>
                  <div className="flex items-center space-x-4">
                    <NotificationBell />
                    <div className="relative">
                      <img
                        src="https://api.dicebear.com/6.x/bottts/svg?seed=Milo"
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-700 bg-gray-800"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2a2a2a]" />
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#1a1a1a]">{children}</main>
          </div>
        </div>
      </NotificationProvider>
    </ThemeProvider>
  )
}

