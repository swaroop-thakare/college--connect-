"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { LayoutDashboard, Calendar, MessageSquare, User, Menu, X, BookOpen, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

const mainNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Profile", href: "/profile", icon: User },
]

export default function Navigation() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) setIsOpen(true)
  }, [isMobile])

  const toggleNav = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleNav}
          className="fixed z-50 top-4 left-4 p-2 bg-purple-600 text-white rounded-lg md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}
      <nav
        className={`fixed md:static z-40 w-64 h-full bg-[#2a2a2a] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2 px-4 py-6 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded bg-purple-600">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-bold text-white">College Connect</span>
          </div>

          {/* Main Navigation */}
          <div className="px-4 py-2 flex-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center h-10 gap-3 px-3 mb-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === item.href ? "bg-purple-600 text-white" : "text-gray-400 hover:bg-[#333] hover:text-white"
                }`}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Profile */}
          <div className="mt-auto px-4 py-4 border-t border-gray-700">
            <div className="flex items-center">
              <img
                src={`https://api.dicebear.com/6.x/bottts/svg?seed=${user?.username}`}
                alt="User Profile"
                className="w-10 h-10 rounded-full mr-3 bg-gray-800"
              />
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Settings and Logout */}
          <div className="px-4 py-4 border-t border-gray-700">
            <Link
              href="/settings"
              className="flex items-center h-10 gap-3 px-3 mb-2 text-sm font-medium rounded-lg text-gray-400 hover:bg-[#333] hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full h-10 gap-3 px-3 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

