"use client"

import { InfoCards } from "@/components/info-cards"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { profile, students, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  const userName = profile?.full_name || "User"
  const studentNames =
    students.length > 0
      ? students.length === 1
        ? students[0].full_name
        : `${students[0].full_name} and ${students.length - 1} other${students.length > 2 ? "s" : ""}`
      : "your children"

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userName}!</h1>
        <p className="text-gray-600">Here's what's happening with {studentNames}'s education</p>
      </div>
      <InfoCards />
    </>
  )
}
