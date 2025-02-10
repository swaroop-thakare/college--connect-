'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EnrollButton({ courseId }: { courseId: string }) {
  const [isEnrolling, setIsEnrolling] = useState(false)
  const router = useRouter()

  const handleEnroll = async () => {
    setIsEnrolling(true)
    try {
      const response = await fetch('/api/courses/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'current-user-id', courseId }),
      })
      if (response.ok) {
        router.refresh()
        alert('Successfully enrolled in the course!')
      } else {
        throw new Error('Failed to enroll')
      }
    } catch (error) {
      alert('Failed to enroll in the course. Please try again.')
    } finally {
      setIsEnrolling(false)
    }
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={isEnrolling}
      className="btn-primary"
    >
      {isEnrolling ? 'Enrolling...' : 'Enroll in Course'}
    </button>
  )
}

