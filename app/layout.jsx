import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthSessionProvider } from "@/components/session-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "College Connect",
  description: "Community Forum for College Events and Clubs",
  generator: "v0.app",
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AuthSessionProvider>{children}</AuthSessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
