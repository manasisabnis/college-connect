"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EventModal({ event, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <p className="text-sm text-gray-500 mb-2">
          📍 {event.location} | 🗓 {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 mb-6">🕒 {event.time}</p>

        {/* --- Payment / Register --- */}
        <Link
          href="https://buy.stripe.com/test_payment_mock"
          target="_blank"
          className="block"
        >
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Proceed to Payment 💳
          </Button>
        </Link>

        <Button
          variant="outline"
          onClick={onClose}
          className="mt-4 w-full"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
