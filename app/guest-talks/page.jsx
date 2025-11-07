"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import { apiClient } from "@/lib/api-client"
import { useSession } from "next-auth/react"

export default function GuestTalksPage() {
  const { data: session } = useSession()
  const [upcomingTalks, setUpcomingTalks] = useState([])
  const [archivedTalks, setArchivedTalks] = useState([])
  const [activeTab, setActiveTab] = useState("upcoming")
  const [loading, setLoading] = useState(true)
  const [registeredTalks, setRegisteredTalks] = useState(new Set())

  useEffect(() => {
    fetchTalks()
  }, [])

  const fetchTalks = async () => {
    try {
      setLoading(true)
      const upcoming = await apiClient.getTalks(false)
      const archived = await apiClient.getTalks(true)
      setUpcomingTalks(upcoming)
      setArchivedTalks(archived)
    } catch (error) {
      console.error("Failed to fetch talks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (talkId) => {
    if (!session) return
    try {
      await apiClient.registerTalk(talkId)
      setRegisteredTalks((prev) => new Set(prev).add(talkId))
    } catch (error) {
      console.error("Failed to register:", error)
    }
  }

  const talks = activeTab === "upcoming" ? upcomingTalks : archivedTalks

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Guest Talks & Lectures</h1>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2 rounded-lg font-medium ${
                activeTab === "upcoming" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Upcoming Talks
            </button>
            <button
              onClick={() => setActiveTab("archived")}
              className={`px-6 py-2 rounded-lg font-medium ${
                activeTab === "archived" ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Recorded Archive
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading talks...</div>
        ) : (
          <div className="space-y-4">
            {talks.map((talk) => (
              <Card key={talk._id} className="border-2 border-primary/20 hover:border-primary/50 transition-all">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{talk.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">Speaker: {talk.speaker}</p>
                      <p className="text-sm text-muted-foreground">{talk.bio}</p>
                    </div>
                    <div className="text-right">
                      {talk.videoUrl && (
                        <Button variant="outline" className="mb-4 bg-transparent">
                          Watch Now
                        </Button>
                      )}
                      <Button
                        onClick={() => handleRegister(talk._id)}
                        disabled={registeredTalks.has(talk._id) || talk.isArchived}
                        className="w-full bg-accent hover:bg-accent/90"
                      >
                        {registeredTalks.has(talk._id) ? "Registered" : "Register"}
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
