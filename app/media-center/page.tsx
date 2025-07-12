"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Download, Share2, Heart, Eye, Calendar, Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function MediaCenterPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const mediaContent = [
    {
      id: 1,
      type: "video",
      title: "Bright Hotel Grand Opening Ceremony",
      description: "Exclusive footage from our grand opening celebration",
      thumbnail: "/placeholder.svg?height=300&width=400&text=🎉+Grand+Opening+Event&bg=dc2626&color=white",
      duration: "12:30",
      views: 15420,
      likes: 892,
      date: "2024-01-15",
      category: "events",
      quality: "4K",
    },
    {
      id: 2,
      type: "video",
      title: "Chef's Special: Behind the Kitchen",
      description: "Meet our executive chef and see how our signature dishes are prepared",
      thumbnail: "/placeholder.svg?height=300&width=400&text=👨‍🍳+Chef+Kitchen+Special&bg=92400e&color=white",
      duration: "8:45",
      views: 8930,
      likes: 567,
      date: "2024-01-10",
      category: "dining",
      quality: "HD",
    },
    {
      id: 3,
      type: "video",
      title: "Spa & Wellness Center Tour",
      description: "Relax and rejuvenate in our world-class spa facilities",
      thumbnail: "/placeholder.svg?height=300&width=400&text=🧘‍♀️+Spa+Wellness+Tour&bg=059669&color=white",
      duration: "6:20",
      views: 12100,
      likes: 743,
      date: "2024-01-08",
      category: "amenities",
      quality: "4K",
    },
    {
      id: 4,
      type: "photo",
      title: "Sunset Views from Presidential Suite",
      description: "Breathtaking sunset photography from our top-tier accommodation",
      thumbnail: "/placeholder.svg?height=300&width=400&text=🌅+Presidential+Sunset&bg=f59e0b&color=white",
      views: 5670,
      likes: 234,
      date: "2024-01-05",
      category: "rooms",
      quality: "RAW",
    },
    {
      id: 5,
      type: "video",
      title: "Wedding Celebration at Bright Hotel",
      description: "A beautiful wedding celebration in our grand ballroom",
      thumbnail: "/placeholder.svg?height=300&width=400&text=💒+Wedding+Celebration&bg=ec4899&color=white",
      duration: "15:20",
      views: 22340,
      likes: 1205,
      date: "2024-01-03",
      category: "events",
      quality: "4K",
    },
    {
      id: 6,
      type: "photo",
      title: "Architectural Photography Collection",
      description: "Professional architectural shots of our hotel design",
      thumbnail: "/placeholder.svg?height=300&width=400&text=🏗️+Architecture+Design&bg=374151&color=white",
      views: 3420,
      likes: 189,
      date: "2024-01-01",
      category: "architecture",
      quality: "RAW",
    },
    {
      id: 7,
      type: "video",
      title: "Business Conference Facilities",
      description: "State-of-the-art meeting rooms and conference facilities",
      thumbnail: "/placeholder.svg?height=300&width=400&text=💼+Business+Conference&bg=1e40af&color=white",
      duration: "7:15",
      views: 6780,
      likes: 345,
      date: "2023-12-28",
      category: "business",
      quality: "HD",
    },
    {
      id: 8,
      type: "video",
      title: "Pool Party Summer Event",
      description: "Highlights from our exclusive summer pool party",
      thumbnail: "/placeholder.svg?height=300&width=400&text=🏊‍♂️+Pool+Party+Summer&bg=0ea5e9&color=white",
      duration: "10:30",
      views: 18920,
      likes: 967,
      date: "2023-12-25",
      category: "events",
      quality: "4K",
    },
  ]

  const categories = [
    { id: "all", name: "All Media" },
    { id: "rooms", name: "Rooms & Suites" },
    { id: "amenities", name: "Amenities" },
    { id: "dining", name: "Dining" },
    { id: "events", name: "Events" },
    { id: "business", name: "Business" },
    { id: "architecture", name: "Architecture" },
  ]

  const filteredContent = mediaContent.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedContent = [...filteredContent].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "popular":
        return b.views - a.views
      case "liked":
        return b.likes - a.likes
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Bright Hotel
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600">
                Home
              </Link>
              <Link href="/rooms" className="text-gray-900 hover:text-blue-600">
                Rooms
              </Link>
              <Link href="/gallery" className="text-gray-900 hover:text-blue-600">
                Gallery
              </Link>
              <Link href="/virtual-tour" className="text-gray-900 hover:text-blue-600">
                Virtual Tour
              </Link>
              <Link href="/media-center" className="text-blue-600 font-semibold">
                Media Center
              </Link>
              <Link href="/contact" className="text-gray-900 hover:text-blue-600">
                Contact
              </Link>
              <Link href="/login" className="text-gray-900 hover:text-blue-600">
                Admin Login
              </Link>
            </div>
            <Button asChild>
              <Link href="/booking">Book Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Media Center</h1>
          <p className="text-xl text-gray-600">Explore our collection of photos, videos, and virtual experiences</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search media content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="popular">Most Viewed</SelectItem>
                    <SelectItem value="liked">Most Liked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedContent.map((item) => (
                <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.type === "video" ? <Play className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                        {item.type === "video" ? "Play" : "View"}
                      </Button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex space-x-2">
                      <Badge className={`${item.type === "video" ? "bg-red-600" : "bg-green-600"} text-white`}>
                        {item.type === "video" ? "VIDEO" : "PHOTO"}
                      </Badge>
                      <Badge variant="secondary">{item.quality}</Badge>
                    </div>

                    {item.type === "video" && (
                      <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">{item.duration}</Badge>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {item.views.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {item.likes}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <Button size="sm" variant="outline" className="flex-1 mr-2 bg-transparent">
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {sortedContent.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex">
                    <div className="relative w-48 h-32 flex-shrink-0">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        width={200}
                        height={130}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="sm">
                          {item.type === "video" ? <Play className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>

                      <Badge
                        className={`absolute top-2 left-2 ${item.type === "video" ? "bg-red-600" : "bg-green-600"} text-white text-xs`}
                      >
                        {item.type === "video" ? "VIDEO" : "PHOTO"}
                      </Badge>

                      {item.type === "video" && (
                        <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs">
                          {item.duration}
                        </Badge>
                      )}
                    </div>

                    <CardContent className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <Badge variant="secondary">{item.quality}</Badge>
                      </div>

                      <p className="text-gray-600 mb-3">{item.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {item.views.toLocaleString()} views
                          </div>
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {item.likes} likes
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm">
                          {item.type === "video" ? <Play className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                          {item.type === "video" ? "Play Video" : "View Photo"}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Content */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Content</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=300&width=600&text=🎬+Hotel+Documentary+4K&bg=dc2626&color=white"
                  alt="Hotel Documentary"
                  width={600}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white">
                    <Play className="w-6 h-6 mr-2" />
                    Watch Documentary
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-red-600 text-white">EXCLUSIVE</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-2">The Making of Bright Hotel</h3>
                <p className="text-gray-600">
                  An exclusive behind-the-scenes documentary about the creation of our luxury hotel
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=300&width=600&text=📸+Professional+Photo+Gallery&bg=7c3aed&color=white"
                  alt="Photo Gallery"
                  width={600}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white">
                    <Eye className="w-6 h-6 mr-2" />
                    View Gallery
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-purple-600 text-white">NEW</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-2">Professional Photography Collection</h3>
                <p className="text-gray-600">High-resolution professional photographs of our hotel and amenities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
