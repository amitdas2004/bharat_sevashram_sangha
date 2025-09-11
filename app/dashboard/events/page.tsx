import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText } from "lucide-react"

export default function EventsPage() {
  const events = [
    {
      title: "Parent-Teacher Meeting",
      date: "Dec 15, 2024",
      type: "meeting",
      description: "Individual meetings with teachers",
    },
    {
      title: "Winter Break",
      date: "Dec 23 - Jan 6",
      type: "holiday",
      description: "School closed for winter holidays",
    },
    { title: "Science Fair", date: "Jan 15, 2025", type: "event", description: "Annual science project exhibition" },
    { title: "Sports Day", date: "Feb 10, 2025", type: "event", description: "Annual sports competition" },
  ]

  const notices = [
    { title: "New Library Hours", date: "Dec 10, 2024", content: "Library will be open until 6 PM starting next week" },
    {
      title: "Uniform Policy Update",
      date: "Dec 8, 2024",
      content: "New guidelines for winter uniform have been issued",
    },
    { title: "Lunch Menu Changes", date: "Dec 5, 2024", content: "Updated lunch menu with more vegetarian options" },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Events & Notices</h1>
        <p className="text-gray-600">Upcoming events and important announcements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <Badge variant={event.type === "holiday" ? "secondary" : "default"}>{event.type}</Badge>
                  </div>
                  <p className="text-sm text-blue-600 mb-1">{event.date}</p>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Recent Notices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notices.map((notice, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-1">{notice.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{notice.date}</p>
                  <p className="text-sm text-gray-600">{notice.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
