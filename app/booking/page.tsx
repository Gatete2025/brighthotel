"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, CreditCard, Smartphone, ArrowLeft, Loader2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/hooks/use-toast"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get("room")
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    room_id: roomId || "1",
    check_in: "",
    check_out: "",
    guests: "1",
    payment_method: "",
    guest_info: {
      name: "",
      email: "",
      phone: "",
      address: "",
      special_requests: "",
    },
  })

  const rooms = [
    { id: "1", name: "Presidential Suite", price: 250 },
    { id: "2", name: "Deluxe Ocean View Suite", price: 180 },
    { id: "3", name: "Executive Business Room", price: 120 },
    { id: "4", name: "Family Apartment", price: 200 },
    { id: "5", name: "Standard Double Room", price: 80 },
    { id: "6", name: "Luxury Penthouse", price: 350 },
  ]

  const selectedRoom = rooms.find((room) => room.id === formData.room_id) || rooms[0]

  // Calculate total nights and amount
  const checkInDate = new Date(formData.check_in)
  const checkOutDate = new Date(formData.check_out)
  const nights =
    formData.check_in && formData.check_out
      ? Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0
  const totalAmount = nights > 0 ? nights * selectedRoom.price : 0

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("guest_info.")) {
      const guestField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        guest_info: {
          ...prev.guest_info,
          [guestField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const validateForm = () => {
    if (!formData.guest_info.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.guest_info.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.guest_info.phone.trim()) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.check_in || !formData.check_out) {
      toast({
        title: "Dates Required",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      })
      return false
    }

    if (nights <= 0) {
      toast({
        title: "Invalid Dates",
        description: "Check-out date must be after check-in date.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.payment_method) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      console.log("Submitting booking:", formData)

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: totalAmount,
          nights,
        }),
      })

      const result = await response.json()
      console.log("Booking response:", result)

      if (result.success) {
        toast({
          title: "Booking Created!",
          description: result.message,
        })

        // Store booking data for success page
        localStorage.setItem(
          "lastBooking",
          JSON.stringify({
            ...result.booking,
            room_name: selectedRoom.name,
            nights,
            total_amount: totalAmount,
          }),
        )

        // Redirect to payment page
        if (result.payment_link) {
          console.log("Redirecting to payment:", result.payment_link)
          window.location.href = result.payment_link
        }
      } else {
        toast({
          title: "Booking Failed",
          description: result.message || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Booking error:", error)
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/rooms">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Rooms
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Book Your Stay</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Room Selection */}
                  <div>
                    <Label htmlFor="room">Select Room</Label>
                    <Select value={formData.room_id} onValueChange={(value) => handleInputChange("room_id", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a room" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name} - ${room.price}/night
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="check_in">Check-in Date</Label>
                      <Input
                        id="check_in"
                        type="date"
                        value={formData.check_in}
                        onChange={(e) => handleInputChange("check_in", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="check_out">Check-out Date</Label>
                      <Input
                        id="check_out"
                        type="date"
                        value={formData.check_out}
                        onChange={(e) => handleInputChange("check_out", e.target.value)}
                        min={formData.check_in || new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select value={formData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Guest{num > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Guest Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Guest Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.guest_info.name}
                          onChange={(e) => handleInputChange("guest_info.name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.guest_info.email}
                          onChange={(e) => handleInputChange("guest_info.email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.guest_info.phone}
                          onChange={(e) => handleInputChange("guest_info.phone", e.target.value)}
                          placeholder="+250 XXX XXX XXX"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={formData.guest_info.address}
                          onChange={(e) => handleInputChange("guest_info.address", e.target.value)}
                          placeholder="Your address"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="special_requests">Special Requests (Optional)</Label>
                      <Textarea
                        id="special_requests"
                        value={formData.guest_info.special_requests}
                        onChange={(e) => handleInputChange("guest_info.special_requests", e.target.value)}
                        placeholder="Any special requests or requirements..."
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <Label>Payment Method *</Label>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      <Card
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          formData.payment_method === "mtn"
                            ? "ring-2 ring-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => handleInputChange("payment_method", "mtn")}
                      >
                        <CardContent className="flex items-center p-4">
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="payment"
                              value="mtn"
                              checked={formData.payment_method === "mtn"}
                              onChange={() => handleInputChange("payment_method", "mtn")}
                              className="text-yellow-600"
                            />
                            <Smartphone className="h-6 w-6 text-yellow-600" />
                            <div>
                              <div className="font-medium">MTN Mobile Money</div>
                              <div className="text-sm text-muted-foreground">Pay with MTN MoMo</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          formData.payment_method === "airtel"
                            ? "ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => handleInputChange("payment_method", "airtel")}
                      >
                        <CardContent className="flex items-center p-4">
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="payment"
                              value="airtel"
                              checked={formData.payment_method === "airtel"}
                              onChange={() => handleInputChange("payment_method", "airtel")}
                              className="text-red-600"
                            />
                            <Smartphone className="h-6 w-6 text-red-600" />
                            <div>
                              <div className="font-medium">Airtel Money</div>
                              <div className="text-sm text-muted-foreground">Pay with Airtel Money</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing Booking...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Complete Booking - ${totalAmount}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">{selectedRoom.name}</h4>
                  <p className="text-sm text-muted-foreground">${selectedRoom.price} per night</p>
                </div>

                {formData.check_in && formData.check_out && (
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {formData.check_in} to {formData.check_out}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      <span>
                        {formData.guests} guest{Number.parseInt(formData.guests) > 1 ? "s" : ""}
                      </span>
                    </div>
                    {nights > 0 && (
                      <div className="text-sm">
                        <span>
                          {nights} night{nights > 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {totalAmount > 0 && (
                  <div className="border-t pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Room cost ({nights} nights)</span>
                        <span>${(nights * selectedRoom.price).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & fees</span>
                        <span>$0.00</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-2 border-t">
                      <span className="font-medium">Total Amount</span>
                      <Badge className="bg-primary text-primary-foreground font-semibold text-lg">${totalAmount}</Badge>
                    </div>
                  </div>
                )}

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Payment processed securely via Flutterwave</p>
                  <p>• Free cancellation up to 24 hours before check-in</p>
                  <p>• Confirmation sent to your email</p>
                  <p>• Contact: +250 788 320 921</p>
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
