"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, GraduationCap, Users, DollarSign, Calendar, Info, LogOut, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Academics", href: "/dashboard/academics", icon: GraduationCap },
  { name: "Attendance", href: "/dashboard/attendance", icon: Users },
  { name: "General Info", href: "/dashboard/info", icon: Info },
  { name: "Help & Support", href: "/dashboard/help-support", icon: MessageCircle },
  { name: "Finance", href: "/dashboard/finance", icon: DollarSign },
  { name: "Events & Notices", href: "/dashboard/events", icon: Calendar },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = () => {
    // Clear any stored auth data
    localStorage.removeItem("user")
    sessionStorage.clear()
    // Redirect to login page
    router.push("/login")
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-gray-900"
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
