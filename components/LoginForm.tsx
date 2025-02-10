"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        const data = await response.json()
        setError(data.error || "Login failed")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-[#2a2a2a] p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Log In</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="username">
          Username
        </label>
        <input
          className="w-full px-3 py-2 bg-[#333] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="password">
          Password
        </label>
        <input
          className="w-full px-3 py-2 bg-[#333] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm italic mb-4">{error}</p>}
      <button
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
        type="submit"
      >
        Sign In
      </button>
    </form>
  )
}

