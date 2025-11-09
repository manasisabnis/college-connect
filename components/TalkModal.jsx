"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TalkModal({ talk, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/talks/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ talkId: talk._id, name, email }),
    });

    if (res.ok) setSubmitted(true);
    else alert("Something went wrong. Try again!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">{talk.title}</h2>
        <p className="text-gray-500 mb-1">{talk.topic}</p>
        <p className="text-gray-600 mb-3">
          👤 {talk.speaker} — {talk.bio}
        </p>
        <p className="text-sm text-gray-500 mb-6">
           {new Date(talk.date).toLocaleDateString()} |  {talk.time}
        </p>

        {!submitted ? (
          <form onSubmit={handleRegister} className="space-y-3">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Register for Talk
            </Button>
          </form>
        ) : (
          <p className="text-green-600 font-medium text-center">
            Registration successful!
          </p>
        )}

        <Button variant="outline" onClick={onClose} className="mt-4 w-full">
          Close
        </Button>
      </div>
    </div>
  );
}
