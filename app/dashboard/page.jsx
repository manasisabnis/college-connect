"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [myClubs, setMyClubs] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
      return
    }

    if (session?.user?.id) {
      const fetchData = async () => {
        try {
          const user = await apiClient.getUser(session.user.id)
          setUserData(user)

          const events = await apiClient.getUserEvents(session.user.id)
          setUpcomingEvents(events.slice(0, 2))

          const clubs = await apiClient.getUserClubs(session.user.id)
          setMyClubs(clubs)

          // Mock recent activity
          setRecentActivity([
            { id: 1, text: "John Doe posted in Tech Club", time: "15:20" },
            { text: "New photos added to Annual Sports Fest album", time: null },
            { text: "New photos added to Annual Fort ur 4", time: "27:204" },
          ])
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    }
  }, [session, status, router])

  if (status === "loading" || loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <Card className="bg-gradient-to-r from-primary to-blue-400 text-white mb-8 border-0">
          <div className="p-8 flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome Back, {userData?.name || session?.user?.name}!</h1>
            </div>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Upcoming Events */}
            <Card className="border-0 shadow-sm">
              <div className="bg-blue-50 px-6 py-4 border-b border-border">
                <h2 className="text-xl font-bold text-foreground">My Upcoming Events</h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div
                      key={event._id}
                      className="flex items-center justify-between pb-4 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} • {event.time}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-primary border-primary hover:bg-primary/10 bg-transparent"
                      >
                        View
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No upcoming events</p>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <div className="bg-blue-50 px-6 py-4 border-b border-border">
                <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
              </div>
              <div className="p-6 space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="text-sm">
                    <p className="text-foreground">{activity.text}</p>
                    {activity.time && <p className="text-muted-foreground text-xs">{activity.time}</p>}
                  </div>
                ))}
              </div>
            </Card>

            {/* My Clubs */}
            <Card className="border-0 shadow-sm">
              <div className="bg-green-50 px-6 py-4 border-b border-border">
                <h2 className="text-lg font-bold text-foreground">My Clubs</h2>
              </div>
              <div className="p-6 space-y-3">
                {myClubs.length > 0 ? (
                  myClubs.map((club) => (
                    <div
                      key={club._id}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    >
                      <span className="text-xl">{club.icon || "🏢"}</span>
                      <span className="font-medium text-foreground">{club.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No clubs yet. Join one to get started!</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
