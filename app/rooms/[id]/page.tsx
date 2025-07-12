import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Star, Users, Maximize, Wifi, Car, Coffee, MapPin, Phone, Mail } from "lucide-react"

// This would typically come from a database or API
const getRoomData = (id: string) => {
  const rooms = {
    "1": {
      id: "1",
      name: "Presidential Suite",
      price: 250,
      description:
        "Our most luxurious suite with panoramic city views, separate living area, and premium amenities. Perfect for special occasions and VIP guests.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop&crop=center",
      gallery: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=500&fit=crop&crop=center",
      ],
      amenities: [
        "King Bed",
        "Living Room",
        "City View",
        "Mini Bar",
        "Work Desk",
        "Balcony",
        "Premium WiFi",
        "24/7 Room Service",
      ],
      capacity: 2,
      size: "75 sqm",
      rating: 5,
      features: [
        "Separate living and sleeping areas",
        "Floor-to-ceiling windows",
        "Marble bathroom with jacuzzi",
        "Private balcony with city views",
        "Premium bedding and linens",
        "Complimentary breakfast",
      ],
    },
    "2": {
      id: "2",
      name: "Deluxe Ocean View Suite",
      price: 180,
      description:
        "Spacious suite with stunning ocean views, modern furnishings, and luxury bathroom. Ideal for couples and business travelers.",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=500&fit=crop&crop=center",
      gallery: [
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop&crop=center",
      ],
      amenities: [
        "Queen Bed",
        "Ocean View",
        "Mini Bar",
        "Coffee Machine",
        "Balcony",
        "Safe",
        "High-Speed WiFi",
        "Room Service",
      ],
      capacity: 2,
      size: "55 sqm",
      rating: 5,
      features: [
        "Panoramic ocean views",
        "Modern contemporary design",
        "Luxury bathroom with rain shower",
        "Private balcony",
        "Work desk with ergonomic chair",
        "Complimentary minibar",
      ],
    },
    "3": {
      id: "3",
      name: "Executive Business Room",
      price: 120,
      description:
        "Perfect for business travelers with dedicated work space and high-speed internet. Designed for productivity and comfort.",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop&crop=center",
      gallery: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=500&fit=crop&crop=center",
      ],
      amenities: [
        "Queen Bed",
        "Work Desk",
        "High-Speed WiFi",
        "Coffee Machine",
        "City View",
        "Phone",
        "Printer Access",
        "Business Center",
      ],
      capacity: 2,
      size: "40 sqm",
      rating: 4,
      features: [
        "Dedicated work area",
        "Ergonomic office chair",
        "Multiple power outlets",
        "City views",
        "Express check-in/out",
        "Complimentary business services",
      ],
    },
    "4": {
      id: "4",
      name: "Family Apartment",
      price: 200,
      description:
        "Spacious apartment perfect for families with separate bedrooms and living area. Includes kitchenette and family-friendly amenities.",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop&crop=center",
      gallery: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=500&fit=crop&crop=center",
      ],
      amenities: [
        "2 Bedrooms",
        "Living Room",
        "Kitchenette",
        "Dining Area",
        "Balcony",
        "Family Friendly",
        "WiFi",
        "Cable TV",
      ],
      capacity: 4,
      size: "80 sqm",
      rating: 5,
      features: [
        "Two separate bedrooms",
        "Full living room with sofa bed",
        "Kitchenette with refrigerator",
        "Dining table for 4",
        "Child-friendly amenities",
        "Extra storage space",
      ],
    },
    "5": {
      id: "5",
      name: "Standard Double Room",
      price: 80,
      description:
        "Comfortable and affordable room with all essential amenities for a pleasant stay. Perfect for budget-conscious travelers.",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=500&fit=crop&crop=center",
      gallery: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop&crop=center",
      ],
      amenities: [
        "Double Bed",
        "Private Bathroom",
        "Air Conditioning",
        "TV",
        "WiFi",
        "Mini Fridge",
        "Safe",
        "Daily Housekeeping",
      ],
      capacity: 2,
      size: "25 sqm",
      rating: 4,
      features: [
        "Comfortable double bed",
        "Private bathroom with shower",
        "Climate control",
        "Flat-screen TV",
        "Complimentary WiFi",
        "Daily housekeeping service",
      ],
    },
    "6": {
      id: "6",
      name: "Luxury Penthouse",
      price: 350,
      description:
        "Ultimate luxury penthouse with private terrace, jacuzzi, and breathtaking city views. The pinnacle of luxury accommodation.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop&crop=center",
      gallery: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop&crop=center",
      ],
      amenities: [
        "King Bed",
        "Private Terrace",
        "Jacuzzi",
        "Living Room",
        "Kitchen",
        "City View",
        "Butler Service",
        "Premium WiFi",
      ],
      capacity: 2,
      size: "120 sqm",
      rating: 5,
      features: [
        "Private rooftop terrace",
        "Outdoor jacuzzi",
        "Full kitchen facilities",
        "Panoramic city views",
        "Personal butler service",
        "Premium furnishings throughout",
      ],
    },
  }

  return rooms[id as keyof typeof rooms] || null
}

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const room = getRoomData(params.id)

  if (!room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Room Not Found</h1>
          <Button asChild>
            <Link href="/rooms">Back to Rooms</Link>
          </Button>
        </div>
      </div>
    )
  }

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
                <Link href="/rooms" className="text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Rooms
                </Link>
                <Link
                  href="/gallery"
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/rooms">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Rooms
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" priority />
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground font-semibold text-lg">${room.price}/night</Badge>
              </div>
            </div>

            {/* Room Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-foreground">{room.name}</h1>
                <div className="flex items-center space-x-1">
                  {[...Array(room.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">{room.description}</p>

              {/* Room Details */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-foreground">Up to {room.capacity} guests</span>
                </div>
                <div className="flex items-center">
                  <Maximize className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-foreground">{room.size}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-foreground">{room.rating} star rating</span>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Room Gallery</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {room.gallery.slice(1).map((image, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${room.name} - Image ${index + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Room Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {room.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-sm">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">${room.price}</CardTitle>
                <CardDescription>per night</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Room type:</span>
                    <span className="text-foreground">{room.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="text-foreground">{room.capacity} guests</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="text-foreground">{room.size}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full">
                    <Link href={`/booking?room=${room.id}`}>Book This Room</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Free cancellation up to 24 hours</p>
                  <p>• Best price guarantee</p>
                  <p>• Instant confirmation</p>
                </div>
              </CardContent>
            </Card>

            {/* Hotel Amenities */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Hotel Amenities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <Wifi className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">Free WiFi</span>
                </div>
                <div className="flex items-center">
                  <Car className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">Free Parking</span>
                </div>
                <div className="flex items-center">
                  <Coffee className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">24/7 Room Service</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">Kigali, Rwanda</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">+250 788 320 921</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">brighthotelapartment@gmail.com</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">© 2024 Bright Hotel & Apartments. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
