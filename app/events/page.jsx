"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import { apiClient } from "@/lib/api-client"
import { useSession } from "next-auth/react"

export default function EventsPage() {
  const { data: session } = useSession()
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [ongoingEvents, setOngoingEvents] = useState([])
  const [activeTab, setActiveTab] = useState("upcoming")
  const [loading, setLoading] = useState(true)
  const [registeredEvents, setRegisteredEvents] = useState(new Set())

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const events = await apiClient.getEvents()
      const now = new Date()

      const upcoming = events.filter((e) => new Date(e.date) > now)
      const ongoing = events.filter((e) => new Date(e.date) <= now)

      setUpcomingEvents(upcoming)
      setOngoingEvents(ongoing)
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (eventId) => {
    if (!session) return
    try {
      await apiClient.registerEvent(eventId)
      setRegisteredEvents((prev) => new Set(prev).add(eventId))
    } catch (error) {
      console.error("Failed to register:", error)
    }
  }

  const events = activeTab === "upcoming" ? upcomingEvents : ongoingEvents

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Upcoming Events</h1>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2 rounded-lg font-medium ${
                activeTab === "upcoming" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab("ongoing")}
              className={`px-6 py-2 rounded-lg font-medium ${
                activeTab === "ongoing" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Ongoing Events
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading events...</div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event._id} className="border-2 border-primary/20 hover:border-primary/50 transition-all">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          Date: {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                        <p>Location: {event.location}</p>
                        <p>Host: {event.hostClub?.name || "TBA"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-secondary/20 rounded-full text-sm font-medium text-secondary mb-4">
                        {event.category}
                      </span>
                      <Button
                        onClick={() => handleRegister(event._id)}
                        disabled={registeredEvents.has(event._id)}
                        className="w-full bg-accent hover:bg-accent/90"
                      >
                        {registeredEvents.has(event._id) ? "Registered" : "Register"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
