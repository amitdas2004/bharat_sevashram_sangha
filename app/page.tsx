import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, Calendar } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
               <Link href="/">
                <img
                  src="http://www.billdesk.com/hdfc/Bharat_Sevashram/images/logo_bss.gif"
                  alt="Bharat Sevashram Sangha Logo"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </Link>

              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bharat Sevashram Sangha</h1>
                <p className="text-sm text-gray-600">Excellence in Education</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Bharat Sevashram Sangha Parent Portal</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Stay connected with your child's education journey. Access grades, attendance, events, and communicate with
            teachers all in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/signup">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Everything You Need to Stay Connected</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader className="text-center">
                <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Academic Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Track your child's grades, assignments, and academic performance in real-time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Attendance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Monitor daily attendance and receive notifications for any absences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Fee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  View fee structure, payment history, and receive due date reminders.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Events & Notices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Stay updated with school events, announcements, and important notices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">© 2024 Bharat Sevashram Sangha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
