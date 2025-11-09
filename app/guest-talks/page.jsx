"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import { apiClient } from "@/lib/api-client";
import TalkModal from "@/components/TalkModal";

export default function TalksPage() {
  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTalk, setSelectedTalk] = useState(null);

  useEffect(() => {
    fetchTalks();
  }, []);

  const fetchTalks = async () => {
    try {
      const data = await apiClient.getTalks();
      setTalks(data);
    } catch (error) {
      console.error("Failed to fetch talks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Guest Talks</h1>
        <p className="text-muted-foreground mb-8">
          Join insightful talks from industry experts and professors
        </p>

        {loading ? (
          <div className="text-center">Loading talks...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talks.map((talk) => (
              <Card
                key={talk._id}
                className="border-2 border-primary/20 hover:border-primary/50 transition-all"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{talk.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {talk.topic}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedTalk(talk)}
                  >
                    More Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedTalk && (
          <TalkModal talk={selectedTalk} onClose={() => setSelectedTalk(null)} />
        )}
      </main>
    </div>
  );
}
