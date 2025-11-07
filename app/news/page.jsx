"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import { apiClient } from "@/lib/api-client"

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)

  useEffect(() => {
    fetchNews()
  }, [selectedCategory, selectedRegion])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getNews(selectedCategory, selectedRegion)
      setNewsItems(data)
    } catch (error) {
      console.error("Failed to fetch news:", error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ["National", "Inter-College"]
  const regions = ["North", "South", "East", "West", "Central"]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">National & Inter-College News</h1>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedCategory === cat ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedRegion === region ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading news...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsItems.map((article) => (
              <Card key={article._id} className="border-2 border-primary/20 hover:border-primary/50 transition-all">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-secondary/20 rounded-full text-sm font-medium text-secondary">
                      {article.category}
                    </span>
                    {article.region && <span className="text-xs text-muted-foreground">{article.region}</span>}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{article.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.source}</span>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
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
