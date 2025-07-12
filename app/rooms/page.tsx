import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Star, Users, Maximize, Wifi, Car, Coffee } from "lucide-react"

export default function RoomsPage() {
  const rooms = [
    {
      id: "1",
      name: "Presidential Suite",
      price: 250,
      description: "Our most luxurious suite with panoramic city views, separate living area, and premium amenities.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop&crop=center",
      amenities: ["King Bed", "Living Room", "City View", "Mini Bar", "Work Desk", "Balcony"],
      capacity: 2,
      size: "75 sqm",
      rating: 5,
    },
    {
      id: "2",
      name: "Deluxe Ocean View Suite",
      price: 180,
      description: "Spacious suite with stunning ocean views, modern furnishings, and luxury bathroom.",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=500&fit=crop&crop=center",
      amenities: ["Queen Bed", "Ocean View", "Mini Bar", "Coffee Machine", "Balcony", "Safe"],
      capacity: 2,
      size: "55 sqm",
      rating: 5,
    },
    {
      id: "3",
      name: "Executive Business Room",
      price: 120,
      description: "Perfect for business travelers with dedicated work space and high-speed internet.",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop&crop=center",
      amenities: ["Queen Bed", "Work Desk", "High-Speed WiFi", "Coffee Machine", "City View", "Phone"],
      capacity: 2,
      size: "40 sqm",
      rating: 4,
    },
    {
      id: "4",
      name: "Family Apartment",
      price: 200,
      description: "Spacious apartment perfect for families with separate bedrooms and living area.",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop&crop=center",
      amenities: ["2 Bedrooms", "Living Room", "Kitchenette", "Dining Area", "Balcony", "Family Friendly"],
      capacity: 4,
      size: "80 sqm",
      rating: 5,
    },
    {
      id: "5",
      name: "Standard Double Room",
      price: 80,
      description: "Comfortable and affordable room with all essential amenities for a pleasant stay.",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=500&fit=crop&crop=center",
      amenities: ["Double Bed", "Private Bathroom", "Air Conditioning", "TV", "WiFi", "Mini Fridge"],
      capacity: 2,
      size: "25 sqm",
      rating: 4,
    },
    {
      id: "6",
      name: "Luxury Penthouse",
      price: 350,
      description: "Ultimate luxury penthouse with private terrace, jacuzzi, and breathtaking city views.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop&crop=center",
      amenities: ["King Bed", "Private Terrace", "Jacuzzi", "Living Room", "Kitchen", "City View"],
      capacity: 2,
      size: "120 sqm",
      rating: 5,
    },
  ]

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

      {/* Header */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Rooms & Suites</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully designed accommodations, each offering unique comfort and luxury for every type of
            traveler.
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.image || "/placeholder.svg"}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground font-semibold">${room.price}/night</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(room.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{room.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{room.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Room Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {room.capacity} guests
                    </div>
                    <div className="flex items-center">
                      <Maximize className="h-4 w-4 mr-1" />
                      {room.size}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{room.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button asChild variant="outline" className="flex-1 bg-transparent">
                      <Link href={`/rooms/${room.id}`}>View Details</Link>
                    </Button>
                    <Button asChild className="flex-1">
                      <Link href={`/booking?room=${room.id}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Amenities */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Hotel Amenities</h2>
            <p className="text-lg text-muted-foreground">Enjoy these complimentary amenities during your stay</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Wifi className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Free WiFi</h3>
              <p className="text-muted-foreground">High-speed internet throughout the property</p>
            </div>
            <div className="flex flex-col items-center">
              <Car className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Free Parking</h3>
              <p className="text-muted-foreground">Complimentary parking for all guests</p>
            </div>
            <div className="flex flex-col items-center">
              <Coffee className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Room Service</h3>
              <p className="text-muted-foreground">Round-the-clock dining and service</p>
            </div>
          </div>
        </div>
      </section>

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
