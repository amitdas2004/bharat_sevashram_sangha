import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, IndianRupeeIcon, GraduationCap, Users } from "lucide-react"

export function InfoCards() {
  const cards = [
    {
      title: "Attendance",
      value: "94%",
      description: "This month",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Latest Grade",
      value: "A-",
      description: "Mathematics Test",
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Fees Due",
      value: "$0",
      description: "All paid up",
      icon: IndianRupeeIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Next Event",
      value: "Dec 15",
      description: "Parent-Teacher Meeting",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">{card.value}</div>
              <p className="text-xs text-gray-500">{card.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
