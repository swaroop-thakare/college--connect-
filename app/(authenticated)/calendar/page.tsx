"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Book, Users, Clock, CalendarIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Event {
  id: string
  title: string
  date: Date
  type: "class" | "assignment" | "exam" | "project"
  color: string
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Database Management Systems Lecture",
    date: new Date(2024, 0, 15, 10, 0),
    type: "class",
    color: "#FF6B6B",
  },
  {
    id: "2",
    title: "Web Development Final Project Due",
    date: new Date(2024, 0, 18, 23, 59),
    type: "project",
    color: "#4ECDC4",
  },
  {
    id: "3",
    title: "Cloud Computing Assignment",
    date: new Date(2024, 0, 20, 14, 0),
    type: "assignment",
    color: "#45B7D1",
  },
  {
    id: "4",
    title: "Java Programming Exam",
    date: new Date(2024, 0, 25, 9, 0),
    type: "exam",
    color: "#FFA07A",
  },
  {
    id: "5",
    title: "Full-Stack Development Workshop",
    date: new Date(2024, 0, 28, 13, 0),
    type: "class",
    color: "#98FB98",
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    setEvents(MOCK_EVENTS)
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Array(42).fill(null)
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    for (let i = 0; i < daysInMonth; i++) {
      days[i + firstDay] = new Date(year, month, i + 1)
    }

    return days
  }

  const changeMonth = (increment: number) => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + increment, 1))
  }

  const getEventsForDate = (date: Date | null) => {
    if (!date) return []
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Academic Calendar</h1>
          <p className="text-gray-400">Plan your academic schedule and track important dates</p>
        </div>

        <Card className="bg-[#2a2a2a] p-6 rounded-xl shadow-sm border-gray-700">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-[#333] text-gray-400">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-[#333] text-gray-400">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm font-medium text-purple-400 hover:bg-[#333] rounded-lg transition-colors"
            >
              Today
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {DAYS.map((day) => (
              <div key={day} className="text-center font-medium text-gray-400">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-4">
            {getDaysInMonth(currentDate).map((date, index) => (
              <div
                key={index}
                className={`aspect-square p-2 rounded-xl transition-all ${
                  date ? "hover:bg-[#333] cursor-pointer" : "bg-[#222]"
                } ${selectedDate && date && selectedDate.getTime() === date.getTime() ? "ring-2 ring-purple-600" : ""}`}
                onClick={() => date && setSelectedDate(date)}
              >
                {date && (
                  <>
                    <div className="flex justify-between items-start">
                      <span
                        className={`text-sm font-medium ${
                          isToday(date)
                            ? "bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                            : "text-gray-300"
                        }`}
                      >
                        {date.getDate()}
                      </span>
                      {getEventsForDate(date).length > 0 && <span className="w-2 h-2 rounded-full bg-purple-600" />}
                    </div>
                    <div className="mt-1 space-y-1">
                      {getEventsForDate(date)
                        .slice(0, 2)
                        .map((event, i) => (
                          <div
                            key={event.id}
                            className="text-xs px-1 py-0.5 rounded truncate"
                            style={{ backgroundColor: `${event.color}20`, color: event.color }}
                          >
                            {event.title}
                          </div>
                        ))}
                      {getEventsForDate(date).length > 2 && (
                        <div className="text-xs text-gray-500">+{getEventsForDate(date).length - 2} more</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Events List */}
        {selectedDate && (
          <Card className="mt-6 p-6 bg-[#2a2a2a] rounded-xl shadow-sm border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">
              Events for{" "}
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h3>
            <div className="space-y-4">
              {getEventsForDate(selectedDate).length === 0 ? (
                <p className="text-gray-400">No events scheduled for this day</p>
              ) : (
                getEventsForDate(selectedDate).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-4 rounded-lg"
                    style={{ backgroundColor: `${event.color}10` }}
                  >
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${event.color}20` }}>
                      {event.type === "class" ? (
                        <Book className="h-5 w-5" style={{ color: event.color }} />
                      ) : event.type === "exam" ? (
                        <Clock className="h-5 w-5" style={{ color: event.color }} />
                      ) : event.type === "project" ? (
                        <Users className="h-5 w-5" style={{ color: event.color }} />
                      ) : (
                        <CalendarIcon className="h-5 w-5" style={{ color: event.color }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{event.title}</h4>
                      <p className="text-sm text-gray-400">
                        {event.date.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

