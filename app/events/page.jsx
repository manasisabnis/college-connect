"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/navigation";
import { apiClient } from "@/lib/api-client";
import EventModal from "@/components/EventModal";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [searchTerm]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getEvents(searchTerm);
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Upcoming Events</h1>
        <p className="text-muted-foreground mb-8">
          Explore and register for exciting college events!
        </p>

        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md mb-8"
        />

        {loading ? (
          <div className="text-center">Loading events...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card
                key={event._id}
                className="border-2 border-primary/20 hover:border-primary/50 transition-all"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedEvent(event)}
                  >
                    More Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </main>
    </div>
  );
}
