import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Star, MapPin, Phone, Mail, Wifi, Car, Coffee, Utensils, Dumbbell, Waves } from "lucide-react"

export default function HomePage() {
  const featuredRooms = [
    {
      id: "1",
      name: "Presidential Suite",
      price: 250,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop&crop=center",
      features: ["Ocean View", "King Bed", "Living Room", "Balcony"],
    },
    {
      id: "2",
      name: "Deluxe Ocean View Suite",
      price: 180,
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=500&fit=crop&crop=center",
      features: ["Ocean View", "Queen Bed", "Mini Bar", "Balcony"],
    },
    {
      id: "3",
      name: "Executive Business Room",
      price: 120,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop&crop=center",
      features: ["City View", "Work Desk", "High-Speed WiFi", "Coffee Machine"],
    },
  ]

  const amenities = [
    { icon: Wifi, name: "Free WiFi", description: "High-speed internet throughout the property" },
    { icon: Car, name: "Free Parking", description: "Complimentary parking for all guests" },
    { icon: Coffee, name: "Room Service", description: "24/7 room service available" },
    { icon: Utensils, name: "Restaurant", description: "Fine dining restaurant on-site" },
    { icon: Dumbbell, name: "Fitness Center", description: "Modern gym with latest equipment" },
    { icon: Waves, name: "Swimming Pool", description: "Outdoor pool with city views" },
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
                <Link href="/" className="text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link
                  href="/rooms"
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&crop=center"
            alt="Bright Hotel Exterior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-yellow-400">Bright Hotel</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Experience luxury and comfort in the heart of Kigali, Rwanda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/booking">Book Your Stay</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/10 border-white text-white hover:bg-white/20"
            >
              <Link href="/rooms">Explore Rooms</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Rooms</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully designed rooms and suites, each offering unique comfort and luxury
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    ${room.price}/night
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{room.name}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Button asChild>
                      <Link href={`/rooms/${room.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hotel Amenities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enjoy world-class facilities and services during your stay
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity) => (
              <Card key={amenity.name} className="text-center">
                <CardContent className="pt-6">
                  <amenity.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{amenity.name}</h3>
                  <p className="text-muted-foreground">{amenity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're here to make your stay unforgettable. Contact us anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card>
              <CardContent className="pt-6">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">Kigali, Rwanda</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">+250 788 320 921</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">brighthotelapartment@gmail.com</p>
              </CardContent>
            </Card>
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
