'use client'

import { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'

interface Course {
  id: string
  name: string
  instructor: string
  credits: number
  description: string
  schedule: string
  capacity: number
  enrolled: number
}

export default function CourseRegistration() {
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchCourses = async () => {
      // Simulating an API call
      const data: Course[] = [
        { id: 'CS101', name: 'Introduction to Computer Science', instructor: 'Dr. Smith', credits: 3, description: 'Fundamental concepts of programming', schedule: 'Mon, Wed 10:00 AM - 11:30 AM', capacity: 30, enrolled: 25 },
        { id: 'MATH201', name: 'Calculus I', instructor: 'Prof. Johnson', credits: 4, description: 'Limits, derivatives, and integrals', schedule: 'Tue, Thu 1:00 PM - 3:00 PM', capacity: 35, enrolled: 30 },
        { id: 'ENG102', name: 'English Composition', instructor: 'Dr. Williams', credits: 3, description: 'Writing and critical thinking skills', schedule: 'Mon, Wed, Fri 9:00 AM - 10:00 AM', capacity: 25, enrolled: 20 },
        { id: 'PHYS101', name: 'Physics for Scientists and Engineers', instructor: 'Dr. Brown', credits: 4, description: 'Mechanics and thermodynamics', schedule: 'Tue, Thu 10:00 AM - 12:00 PM', capacity: 40, enrolled: 35 },
      ]
      setCourses(data)
    }

    fetchCourses()
  }, [])

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would send the selected courses to an API
    console.log('Registered courses:', selectedCourses)
    alert('Course registration successful!')
  }

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || (filter === 'available' && course.enrolled < course.capacity))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Course Registration</h1>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Courses</option>
            <option value="available">Available Courses</option>
          </select>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-4 md:p-6 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">{course.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">Instructor: {course.instructor}</p>
                  <p className="text-sm text-gray-600 mb-1">Credits: {course.credits}</p>
                  <p className="text-sm text-gray-600 mb-1">Schedule: {course.schedule}</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="text-sm font-semibold mb-1">
                    {course.enrolled} / {course.capacity}
                  </p>
                  <p className="text-xs text-gray-500">Enrolled</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => handleCourseToggle(course.id)}
                    className="form-checkbox h-5 w-5 text-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">Select Course</span>
                </label>
                {course.enrolled >= course.capacity && (
                  <span className="text-xs font-semibold text-red-500">Course Full</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Register for Selected Courses
        </button>
      </form>
    </div>
  )
}

