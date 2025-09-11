import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Phone, Mail, MapPin } from "lucide-react"

export default function InfoPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">General Information</h1>
        <p className="text-gray-600">School timings, holidays, and contact details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              School Timings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium">8:00 AM - 3:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">8:00 AM - 12:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="mr-3 h-4 w-4 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-4 w-4 text-gray-400" />
                <span>info@sunshineacademy.edu</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-3 h-4 w-4 text-gray-400" />
                <span>123 Education St, Learning City, LC 12345</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Important Holidays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Winter Break</h4>
                <p className="text-sm text-gray-600">December 23, 2024 - January 6, 2025</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Spring Break</h4>
                <p className="text-sm text-gray-600">March 15 - March 22, 2025</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Summer Break</h4>
                <p className="text-sm text-gray-600">June 15 - August 15, 2025</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Teacher Development Days</h4>
                <p className="text-sm text-gray-600">Various dates throughout the year</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
