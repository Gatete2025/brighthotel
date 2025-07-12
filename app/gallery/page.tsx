"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop&crop=center",
      alt: "Hotel Exterior View",
      category: "Exterior",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&crop=center",
      alt: "Presidential Suite",
      category: "Rooms",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop&crop=center",
      alt: "Deluxe Ocean View Suite",
      category: "Rooms",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&crop=center",
      alt: "Hotel Restaurant",
      category: "Dining",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop&crop=center",
      alt: "Executive Business Room",
      category: "Rooms",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center",
      alt: "Family Apartment",
      category: "Rooms",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop&crop=center",
      alt: "Luxury Penthouse",
      category: "Rooms",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center",
      alt: "Standard Double Room",
      category: "Rooms",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&crop=center",
      alt: "Hotel Lobby",
      category: "Interior",
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop&crop=center",
      alt: "Swimming Pool",
      category: "Amenities",
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop&crop=center",
      alt: "Spa & Wellness Center",
      category: "Amenities",
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1559508551-44bff1de756b?w=800&h=600&fit=crop&crop=center",
      alt: "Conference Room",
      category: "Business",
    },
  ]

  const categories = ["All", "Exterior", "Rooms", "Dining", "Interior", "Amenities", "Business"]

  const filteredImages =
    selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(filteredImages[newIndex].id)
  }

  const selectedImageData = galleryImages.find((img) => img.id === selectedImage)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                Bright Hotel
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/rooms"
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Rooms
                </Link>
                <Link href="/gallery" className="text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Gallery
                </Link>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/booking"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Book Now
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Photo Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our beautiful hotel through these stunning photographs showcasing our rooms, amenities, and
            facilities.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                <Filter className="h-4 w-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative h-64" onClick={() => openLightbox(image.id)}>
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      {image.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground">{image.alt}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && selectedImageData && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={closeLightbox}
            >
              <X className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="relative">
              <Image
                src={selectedImageData.src || "/placeholder.svg"}
                alt={selectedImageData.alt}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded">
                <h3 className="font-medium">{selectedImageData.alt}</h3>
                <p className="text-sm opacity-80">{selectedImageData.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">© 2024 Bright Hotel & Apartments. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
