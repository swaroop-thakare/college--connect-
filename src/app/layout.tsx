import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/components/ThemeProvider"
import { NotificationProvider } from "@/contexts/NotificationContext"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "College Connect",
  description: "A platform for students and teachers to interact, manage assignments, and communicate.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1a1a1a] text-white`}>
        <AuthProvider>
          <ThemeProvider>
            <NotificationProvider>
              {children}
              <Toaster />
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

