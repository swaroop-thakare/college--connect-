"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Book, Users, Clock, Calendar, User } from "lucide-react"
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
  syllabus: string[]
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
    syllabus: [
      "Introduction to programming concepts",
      "Data types and variables",
      "Control structures",
      "Functions and modules",
      "Basic data structures",
      "Introduction to algorithms",
      "File I/O",
      "Object-oriented programming basics",
    ],
  },
  // ... (other courses)
]

export default function CourseDetailPage() {
  const { id } = useParams()
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    // In a real application, this would be an API call
    const foundCourse = MOCK_COURSES.find((c) => c.id === id)
    setCourse(foundCourse || null)
  }, [id])

  if (!course) {
    return <div className="p-4 md:p-6 max-w-7xl mx-auto">Course not found</div>
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{course.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Course Description</h2>
            <p className="text-gray-700">{course.description}</p>
          </Card>
          <Card className="mb-6 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Syllabus</h2>
            <ul className="list-disc pl-5">
              {course.syllabus.map((item, index) => (
                <li key={index} className="text-gray-700 mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div>
          <Card className="mb-6 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Course Details</h2>
            <div className="flex items-center mb-4">
              <Book className="h-5 w-5 mr-2 text-[#E91E63]" />
              <span className="text-gray-700">{course.credits} credits</span>
            </div>
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 mr-2 text-[#E91E63]" />
              <span className="text-gray-700">{course.instructor}</span>
            </div>
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 mr-2 text-[#E91E63]" />
              <span className="text-gray-700">
                {course.enrolled} / {course.capacity} enrolled
              </span>
            </div>
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 mr-2 text-[#E91E63]" />
              <span className="text-gray-700">{course.schedule}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-[#E91E63]" />
              <span className="text-gray-700">{course.department}</span>
            </div>
          </Card>
          <button className="w-full bg-[#E91E63] text-white py-2 px-4 rounded-lg hover:bg-[#D81B60] transition-colors">
            Enroll in Course
          </button>
        </div>
      </div>
    </div>
  )
}

