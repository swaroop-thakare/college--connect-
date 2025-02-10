"use client"

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

const MOCK_EVENTS: Event[]

