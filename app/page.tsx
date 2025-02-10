import Link from "next/link"
import { ArrowRight, BookOpen, Users, Calendar, MessageSquare } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-800 to-purple-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to College Connect</h1>
          <p className="text-xl mb-8">Empowering students and faculty with a comprehensive learning platform</p>
          <div className="space-x-4">
            <Link
              href="/login"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={BookOpen}
              title="Course Management"
              description="Access and manage your courses with ease"
            />
            <FeatureCard
              icon={Users}
              title="Collaboration Tools"
              description="Connect with classmates and instructors seamlessly"
            />
            <FeatureCard
              icon={Calendar}
              title="Academic Calendar"
              description="Stay on top of important dates and deadlines"
            />
            <FeatureCard
              icon={MessageSquare}
              title="Messaging System"
              description="Communicate effectively within the platform"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-700 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join College Connect today and transform your academic journey</p>
          <Link
            href="/signup"
            className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Sign Up Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2a2a2a] py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 College Connect. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/about" className="text-gray-400 hover:text-white mx-2">
              About
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white mx-2">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white mx-2">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white mx-2">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-[#2a2a2a] p-6 rounded-lg text-center">
      <Icon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

