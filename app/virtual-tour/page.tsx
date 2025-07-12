"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function VirtualTourPage() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const virtualTours = [
    {
      id: 1,
      title: "Complete Hotel Tour",
      description: "Take a comprehensive 4K virtual tour of our entire hotel facility",
      duration: "8:45",
      thumbnail: "/placeholder.svg?height=400&width=600&text=🎥+Complete+Hotel+Tour+4K&bg=dc2626&color=white",
      videoUrl: "/placeholder-video.mp4",
      highlights: ["Grand Lobby", "Reception Area", "Restaurants", "Pool Area", "Spa", "Fitness Center"],
    },
    {
      id: 2,
      title: "Deluxe Ocean View Suite",
      description: "Explore our most popular ocean-facing luxury suite",
      duration: "5:30",
      thumbnail: "/placeholder.svg?height=400&width=600&text=🌊+Ocean+Suite+360°+Tour&bg=0ea5e9&color=white",
      videoUrl: "/placeholder-video.mp4",
      highlights: ["Ocean Views", "King Bedroom", "Marble Bathroom", "Private Balcony", "Mini Bar"],
    },
    {
      id: 3,
      title: "Presidential Suite Experience",
      description: "Step inside our most luxurious presidential suite",
      duration: "7:20",
      thumbnail: "/placeholder.svg?height=400&width=600&text=👑+Presidential+Suite+VIP&bg=7c2d12&color=white",
      videoUrl: "/placeholder-video.mp4",
      highlights: ["Master Bedroom", "Living Room", "Dining Area", "Jacuzzi", "Butler Service"],
    },
    {
      id: 4,
      title: "Family Apartment Tour",
      description: "Perfect for families - see our spacious apartment accommodations",
      duration: "6:15",
      thumbnail: "/placeholder.svg?height=400&width=600&text=👨‍👩‍👧‍👦+Family+Apartment+Tour&bg=059669&color=white",
      videoUrl: "/placeholder-video.mp4",
      highlights: ["2 Bedrooms", "Full Kitchen", "Living Area", "Dining Space", "Kids Area"],
    },
    {
      id: 5,
      title: "Hotel Amenities Showcase",
      description: "Discover all our world-class amenities and facilities",
      duration: "9:10",
      thumbnail: "/placeholder.svg?height=400&width=600&text=🏊‍♂️+Amenities+Showcase+HD&bg=7c3aed&color=white",
      videoUrl: "/placeholder-video.mp4",
      highlights: ["Swimming Pool", "Spa Center", "Fitness Gym", "Business Center", "Conference Rooms"],
    },
    {
      id: 6,
      title: "Dining Experience Tour",
      description: "Explore our restaurants, bars, and culinary offerings",
      duration: "4:45",
      thumbnail: "/placeholder.svg?height=400&width=600&text=🍽️+Dining+Experience+Tour&bg=92400e&color=white",
      videoUrl: "/placeholder-video.mp4",
      highlights: ["Main Restaurant", "Rooftop Bar", "Coffee Shop", "Room Service", "Chef's Kitchen"],
    },
  ]

  const currentTour = virtualTours[currentVideo]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

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
              <Link href="/virtual-tour" className="text-blue-600 font-semibold">
                Virtual Tour
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
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/gallery">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Link>
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Virtual Hotel Tours</h1>
          <p className="text-xl text-gray-600">Experience Bright Hotel from anywhere in the world</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative bg-black">
                <Image
                  src={currentTour.thumbnail || "/placeholder.svg"}
                  alt={currentTour.title}
                  width={800}
                  height={450}
                  className="w-full h-[450px] object-cover"
                />

                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="flex items-center space-x-4">
                    <Button
                      size="lg"
                      onClick={togglePlay}
                      className="bg-white/20 hover:bg-white/30 text-white border-white"
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                    </Button>
                  </div>
                </div>

                {/* Video Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <Button size="sm" variant="ghost" onClick={togglePlay} className="text-white hover:bg-white/20">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={toggleMute} className="text-white hover:bg-white/20">
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <span className="text-sm">0:00 / {currentTour.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Quality Badge */}
                <Badge className="absolute top-4 right-4 bg-red-600 text-white">4K Ultra HD</Badge>
              </div>

              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">{currentTour.title}</h2>
                <p className="text-gray-600 mb-4">{currentTour.description}</p>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Tour Highlights:</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentTour.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Duration: {currentTour.duration}</div>
                  <Button asChild>
                    <Link href="/booking">Book This Room</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Playlist */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Virtual Tours</CardTitle>
                <CardDescription>Choose a tour to explore</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {virtualTours.map((tour, index) => (
                  <div
                    key={tour.id}
                    className={`cursor-pointer rounded-lg p-3 transition-all ${
                      currentVideo === index
                        ? "bg-blue-50 border-2 border-blue-600"
                        : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                    onClick={() => setCurrentVideo(index)}
                  >
                    <div className="flex space-x-3">
                      <div className="relative flex-shrink-0">
                        <Image
                          src={tour.thumbnail || "/placeholder.svg"}
                          alt={tour.title}
                          width={80}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                        <Badge className="absolute bottom-1 right-1 text-xs bg-black/80 text-white">
                          {tour.duration}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1 truncate">{tour.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{tour.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 360° Virtual Reality */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>360° VR Experience</CardTitle>
                <CardDescription>Immersive virtual reality tours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=200&width=300&text=🥽+360°+VR+Experience&bg=7c3aed&color=white"
                      alt="VR Experience"
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                      <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                        Launch VR Tour
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Experience our hotel in full 360° virtual reality. Compatible with VR headsets and mobile devices.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interactive Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Interactive Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎥</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">4K Ultra HD</h3>
                <p className="text-gray-600">Crystal clear video quality for the best viewing experience</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥽</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">VR Compatible</h3>
                <p className="text-gray-600">Full 360° virtual reality experience available</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Mobile Friendly</h3>
                <p className="text-gray-600">Optimized for all devices including smartphones and tablets</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
