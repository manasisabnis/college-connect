"use client"

import { SessionProvider } from "next-auth/react"

/**
 * SessionProvider wrapper component
 * Required for useSession hook to work throughout the app
 * Must be a client component
 */
export function AuthSessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}
