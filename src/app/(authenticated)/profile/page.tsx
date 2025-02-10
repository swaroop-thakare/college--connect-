"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Calendar, BookOpen, Award, Edit } from "lucide-react"
import { Card } from "@/components/ui/card"
import type React from "react" // Import React

interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  role: string
  joinDate: string
  major: string
  bio: string
  gpa: number
  credits: number
  achievements: string[]
  education: {
    degree: string
    institution: string
    duration: string
    location: string
  }
  skills: string[]
}

const MOCK_USER: UserProfile = {
  name: "Swaroop Thakare",
  email: "swaroop.swaroop22@pccoepune.org",
  phone: "+91 9561060731",
  address: "Pune, India",
  role: "Computer Engineering Student",
  joinDate: "August 2022",
  major: "Computer Engineering",
  bio: "Computer Engineering Student with Expertise in Full-Stack Development and Cloud Computing, Proficient in Database Management Systems, Web Development, and AWS Cloud Solutions. Certified in advanced SQL, MySQL, PostgreSQL, MongoDB, and React.js development. Successfully contributed to projects, including an accessible public transportation system and a freelancer management platform, emphasizing scalability and inclusivity. Skilled in implementing innovative solutions using Java, SQL, and modern web technologies to address real-world challenges. Dedicated to leveraging full-stack development and cloud computing to drive impactful outcomes.",
  gpa: 3.8,
  credits: 60,
  achievements: [
    "Certified in advanced SQL, MySQL, PostgreSQL, MongoDB, and React.js development",
    "Contributed to an accessible public transportation system project",
    "Developed a freelancer management platform",
    "Implemented innovative solutions using Java, SQL, and modern web technologies",
  ],
  education: {
    degree: "Bachelors of Technology in Computer Engineering",
    institution: "Pimpri Chinchwad College of Engineering",
    duration: "August 2022 - June 2026 (Expected)",
    location: "Pune, India",
  },
  skills: [
    "Full-Stack Development",
    "Cloud Computing",
    "Database Management Systems",
    "Web Development",
    "AWS Cloud Solutions",
    "Java",
    "SQL",
    "React.js",
  ],
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // In a real application, this would be an API call
    setUser(MOCK_USER)
  }, [])

  if (!user) {
    return <div className="p-6 max-w-7xl mx-auto text-white">Loading...</div>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6 p-6 bg-[#2a2a2a] border-gray-700">
            <div className="flex items-center mb-4">
              <img
                src="https://api.dicebear.com/6.x/bottts/svg?seed=Felix"
                alt="Profile"
                className="w-24 h-24 rounded-full mr-4 bg-gray-800"
              />
              <div>
                <h2 className="text-2xl font-semibold text-white">{user.name}</h2>
                <p className="text-gray-400">
                  {user.role} - {user.major}
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">{user.bio}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileField icon={Mail} value={user.email} isEditing={isEditing} />
              <ProfileField icon={Phone} value={user.phone} isEditing={isEditing} />
              <ProfileField icon={MapPin} value={user.address} isEditing={isEditing} />
              <ProfileField icon={Calendar} value={`Joined: ${user.joinDate}`} isEditing={false} />
            </div>
          </Card>
          <Card className="mb-6 p-6 bg-[#2a2a2a] border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">Academic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileField icon={Award} value={`GPA: ${user.gpa}`} isEditing={false} />
              <ProfileField icon={BookOpen} value={`Credits: ${user.credits}`} isEditing={false} />
            </div>
          </Card>
          <Card className="mb-6 p-6 bg-[#2a2a2a] border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">Education</h2>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-white">{user.education.degree}</h3>
              <p className="text-gray-300">{user.education.institution}</p>
              <p className="text-gray-400">{user.education.duration}</p>
              <p className="text-gray-400">{user.education.location}</p>
            </div>
          </Card>
          <Card className="p-6 bg-[#2a2a2a] border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">Achievements</h2>
            <ul className="list-disc pl-5">
              {user.achievements.map((achievement, index) => (
                <li key={index} className="text-gray-300 mb-2">
                  {achievement}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="mb-6 p-6 bg-[#2a2a2a] border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span key={index} className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
        <div>
          <Card className="mb-6 p-6 bg-[#2a2a2a] border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">Quick Links</h2>
            <ul className="space-y-4">
              <li>
                <a href="/courses" className="text-purple-400 hover:text-purple-300 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src="https://api.dicebear.com/6.x/bottts/svg?seed=Aneka"
                      alt="Courses"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>My Courses</span>
                </a>
              </li>
              <li>
                <a href="/grades" className="text-purple-400 hover:text-purple-300 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src="https://api.dicebear.com/6.x/bottts/svg?seed=Bailey"
                      alt="Grades"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>View Grades</span>
                </a>
              </li>
              <li>
                <a href="/schedule" className="text-purple-400 hover:text-purple-300 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src="https://api.dicebear.com/6.x/bottts/svg?seed=Cleo"
                      alt="Schedule"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>Class Schedule</span>
                </a>
              </li>
              <li>
                <a href="/advisor" className="text-purple-400 hover:text-purple-300 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img
                      src="https://api.dicebear.com/6.x/bottts/svg?seed=Dusty"
                      alt="Advisor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>Academic Advisor</span>
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface ProfileFieldProps {
  icon: React.ElementType
  value: string
  isEditing: boolean
}

function ProfileField({ icon: Icon, value, isEditing }: ProfileFieldProps) {
  return (
    <div className="flex items-center">
      <Icon className="h-5 w-5 mr-2 text-purple-400" />
      {isEditing ? (
        <input
          type="text"
          value={value}
          className="w-full bg-[#333] text-white border border-gray-700 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      ) : (
        <span className="text-gray-300">{value}</span>
      )}
    </div>
  )
}

