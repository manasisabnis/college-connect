"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ClubModal({ club, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/clubs/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clubId: club._id, name, email }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert("Something went wrong, please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
        <h2 className="text-2xl font-semibold mb-2">{club.name}</h2>
        <p className="text-gray-600 mb-4">{club.description}</p>
        <p className="text-sm text-gray-500 mb-6">
          Category: {club.category} <br />
          Members: {club.membersCount || "N/A"}
        </p>

        {!submitted ? (
          <form onSubmit={handleApply} className="space-y-3">
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
              Apply to Join
            </Button>
          </form>
        ) : (
          <p className="text-green-600 text-center font-medium">
            ✅ Application submitted successfully!
          </p>
        )}

        <Button variant="outline" onClick={onClose} className="mt-4 w-full">
          Close
        </Button>
      </div>
    </div>
  );
}
