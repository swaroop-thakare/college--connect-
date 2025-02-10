"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { BookOpen, Calendar, GraduationCap, Bell, Clock, ArrowRight } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import AcademicChatbot from "@/components/AcademicChatbot"

// Mock data for the dashboard
const courseProgress = [
  { name: "Computer Science 101", progress: 75 },
  { name: "Data Structures", progress: 60 },
  { name: "Web Development", progress: 90 },
  { name: "Algorithms", progress: 45 },
]

const upcomingEvents = [
  { id: 1, title: "Project Submission", date: "2024-03-15", course: "Web Development" },
  { id: 2, title: "Midterm Exam", date: "2024-03-20", course: "Data Structures" },
  { id: 3, title: "Guest Lecture", date: "2024-03-25", course: "Computer Science 101" },
]

const gradeData = [
  { course: "CS101", grade: 85 },
  { course: "DS201", grade: 78 },
  { course: "WD301", grade: 92 },
  { course: "ALG401", grade: 70 },
]

export default function Dashboard() {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {greeting}, {user?.name}
        </h1>
        <p className="text-lg text-gray-400 mb-6">{user?.email}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard title="Courses Enrolled" value="4" icon={BookOpen} link="/courses" />
          <DashboardCard
            title="Upcoming Events"
            value={upcomingEvents.length.toString()}
            icon={Calendar}
            link="/calendar"
          />
          <DashboardCard title="Current GPA" value="3.7" icon={GraduationCap} link="/grades" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-[#2a2a2a] p-6">
            <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
            <div className="space-y-4">
              {courseProgress.map((course) => (
                <div key={course.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{course.name}</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-[#2a2a2a] p-6">
            <h2 className="text-xl font-semibold mb-4">Grade Overview</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="course" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} itemStyle={{ color: "#fff" }} />
                  <Bar dataKey="grade" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-[#2a2a2a] p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 p-2 rounded-full">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-gray-400">{event.course}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{event.date}</div>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full" variant="outline">
              <Link href="/calendar" className="flex items-center justify-center w-full">
                View Full Calendar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          <Card className="bg-[#2a2a2a] p-6">
            <h2 className="text-xl font-semibold mb-4">Academic Chatbot</h2>
            <AcademicChatbot />
          </Card>
        </div>

        <Card className="bg-[#2a2a2a] p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-500 p-2 rounded-full">
                <Bell className="h-5 w-5 text-yellow-900" />
              </div>
              <div>
                <h3 className="font-medium">New announcement in Web Development</h3>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 p-2 rounded-full">
                <GraduationCap className="h-5 w-5 text-green-900" />
              </div>
              <div>
                <h3 className="font-medium">Grade posted for Algorithms quiz</h3>
                <p className="text-sm text-gray-400">1 day ago</p>
              </div>
            </div>
          </div>
          <Button className="mt-4 w-full" variant="outline">
            <Link href="/notifications" className="flex items-center justify-center w-full">
              View All Notifications
              <ArrowRight className="ml-2 h-4 w-5" />
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}

function DashboardCard({ title, value, icon: Icon, link }) {
  return (
    <Card className="bg-[#2a2a2a] p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Icon className="h-6 w-6 text-purple-500" />
      </div>
      <p className="text-3xl font-bold mb-4">{value}</p>
      <Button variant="link" className="p-0">
        <Link href={link} className="text-purple-400 hover:text-purple-300">
          View Details
        </Link>
      </Button>
    </Card>
  )
}

