"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) fetchUserData();
  }, [session]);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/users/${session.user.id}`);
      if (!res.ok) throw new Error("Failed to fetch user data");
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (type, id) => {
    if (type === "club") router.push(`/clubs/${id}`);
    if (type === "event") router.push(`/events/${id}`);
    if (type === "talk") router.push(`/guest-talks/${id}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading your dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {userData?.name} 👋
          </h1>
          <p className="text-gray-600 mb-8">Email: {userData?.email}</p>
        </header>

        {/* --- Clubs Section --- */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Clubs</h2>
          {userData?.clubsJoined?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.clubsJoined.map((club) => (
                <Card
                  key={club._id}
                  className="p-5 cursor-pointer hover:shadow-lg transition"
                  onClick={() => handleNavigate("club", club._id)}
                >
                  <div className="text-3xl mb-3">{club.icon || "🏫"}</div>
                  <h3 className="text-lg font-bold">{club.name}</h3>
                  <p className="text-sm text-gray-600">{club.tagline}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven’t joined any clubs yet.</p>
          )}
        </section>

        {/* --- Events Section --- */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Registered Events</h2>
          {userData?.eventsRegistered?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.eventsRegistered.map((event) => (
                <Card
                  key={event._id}
                  className="p-5 cursor-pointer hover:shadow-lg transition"
                  onClick={() => handleNavigate("event", event._id)}
                >
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.location}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString()} • {event.time}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No event registrations yet.</p>
          )}
        </section>

        {/* --- Talks Section --- */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Guest Talks</h2>
          {userData?.talksRegistered?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.talksRegistered.map((talk) => (
                <Card
                  key={talk._id}
                  className="p-5 cursor-pointer hover:shadow-lg transition"
                  onClick={() => handleNavigate("talk", talk._id)}
                >
                  <h3 className="text-lg font-bold">{talk.title}</h3>
                  <p className="text-sm text-gray-600">{talk.speaker}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No talks attended yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}
