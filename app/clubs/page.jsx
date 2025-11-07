"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/navigation"
import { apiClient } from "@/lib/api-client"
import { useSession } from "next-auth/react"

export default function ClubsPage() {
  const { data: session } = useSession()
  const [clubs, setClubs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [joinedClubs, setJoinedClubs] = useState(new Set())

  useEffect(() => {
    fetchClubs()
  }, [searchTerm])

  const fetchClubs = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getClubs(searchTerm)
      setClubs(data)
    } catch (error) {
      console.error("Failed to fetch clubs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinClub = async (clubId) => {
    if (!session) return
    try {
      await apiClient.joinClub(clubId)
      setJoinedClubs((prev) => new Set(prev).add(clubId))
    } catch (error) {
      console.error("Failed to join club:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">College Clubs Directory</h1>
          <p className="text-muted-foreground">Discover and join clubs at our college</p>
        </div>

        <div className="mb-8">
          <Input
            placeholder="Search for clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <div className="text-center">Loading clubs...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <Card key={club._id} className="border-2 border-primary/20 hover:border-primary/50 transition-all">
                <div className="p-6">
                  <div className="text-4xl mb-4">{club.icon || "🏢"}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{club.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{club.tagline || club.description}</p>
                  <Button
                    onClick={() => handleJoinClub(club._id)}
                    disabled={joinedClubs.has(club._id)}
                    className="w-full bg-accent hover:bg-accent/90"
                  >
                    {joinedClubs.has(club._id) ? "Joined" : "Join/Follow"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
