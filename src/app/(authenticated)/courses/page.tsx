"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, Book, Users, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Course {
  id: string
  name: string
  instructor: string
  credits: number
  description: string
  schedule: string
  capacity: number
  enrolled: number
  department: string
}

const MOCK_COURSES: Course[] = [
  {
    id: "CS101",
    name: "Introduction to Computer Science",
    instructor: "Dr. Smith",
    credits: 3,
    description: "Fundamental concepts of programming and computer science",
    schedule: "Mon, Wed 10:00 AM - 11:30 AM",
    capacity: 30,
    enrolled: 25,
    department: "Computer Science",
  },
  {
    id: "MATH201",
    name: "Calculus I",
    instructor: "Prof. Johnson",
    credits: 4,
    description: "Limits, derivatives, and integrals",
    schedule: "Tue, Thu 1:00 PM - 3:00 PM",
    capacity: 35,
    enrolled: 30,
    department: "Mathematics",
  },
  {
    id: "ENG102",
    name: "English Composition",
    instructor: "Dr. Williams",
    credits: 3,
    description: "Writing and critical thinking skills",
    schedule: "Mon, Wed, Fri 9:00 AM - 10:00 AM",
    capacity: 25,
    enrolled: 20,
    department: "English",
  },
  {
    id: "PHYS101",
    name: "Physics for Scientists and Engineers",
    instructor: "Dr. Brown",
    credits: 4,
    description: "Mechanics and thermodynamics",
    schedule: "Tue, Thu 10:00 AM - 12:00 PM",
    capacity: 40,
    enrolled: 35,
    department: "Physics",
  },
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    // In a real application, this would be an API call
    setCourses(MOCK_COURSES)
  }, [])

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "all" || course.department.toLowerCase() === filter.toLowerCase()),
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">Course Catalog</h1>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#2a2a2a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#2a2a2a] text-white border border-gray-700 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English">English</option>
            <option value="Physics">Physics</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link href={`/courses/${course.id}`} key={course.id}>
            <Card className="hover:shadow-lg transition-shadow duration-300 p-6 bg-[#2a2a2a] border-gray-700">
              <h2 className="text-xl font-semibold mb-2 text-white">{course.name}</h2>
              <p className="text-sm text-gray-400 mb-4">{course.description}</p>
              <div className="flex items-center text-sm text-gray-300 mb-2">
                <Book className="h-4 w-4 mr-2" />
                <span>{course.credits} credits</span>
              </div>
              <div className="flex items-center text-sm text-gray-300 mb-2">
                <Users className="h-4 w-4 mr-2" />
                <span>
                  {course.enrolled} / {course.capacity} enrolled
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Clock className="h-4 w-4 mr-2" />
                <span>{course.schedule}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

