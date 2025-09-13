import { InfoCards } from "@/components/info-cards"

export default function DashboardPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah!</h1>
        <p className="text-gray-600">Here's what's happening with Emma's education</p>
      </div>
      <InfoCards />
    </>
  )
}
