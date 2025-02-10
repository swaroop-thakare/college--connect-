'use client'

import { useState, useEffect } from 'react'
import { User, Book, Award } from 'lucide-react'

interface StudentInfo {
  id: string
  name: string
  email: string
  major: string
  gpa: number
  enrollmentYear: number
}

export default function StudentProfile() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null)

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchStudentInfo = async () => {
      // Simulating an API call
      const data: StudentInfo = {
        id: '12345',
        name: 'John Doe',
        email: 'john.doe@example.com',
        major: 'Computer Science',
        gpa: 3.8,
        enrollmentYear: 2020,
      }
      setStudentInfo(data)
    }

    fetchStudentInfo()
  }, [])

  if (!studentInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Student Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <User className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">{studentInfo.name}</span>
        </div>
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">{studentInfo.email}</span>
        </div>
        <div className="flex items-center">
          <Book className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">{studentInfo.major}</span>
        </div>
        <div className="flex items-center">
          <Award className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">GPA: {studentInfo.gpa}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">Enrolled: {studentInfo.enrollmentYear}</span>
        </div>
      </div>
    </div>
  )
}

