"use client"

import { Button } from "@/components/ui/button"
import { Bell, User } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-bold">S</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Bharat Sevashram Sangha</h2>
            <p className="text-sm text-gray-500">Parent Portal</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
