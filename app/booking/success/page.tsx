"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Calendar, Users, MapPin, Phone, Mail, Download } from "lucide-react"

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const [bookingData, setBookingData] = useState<any>(null)

  const tx_ref = searchParams.get("tx_ref")
  const status = searchParams.get("status")

  useEffect(() => {
    // Get booking data from localStorage
    const lastBooking = localStorage.getItem("lastBooking")
    if (lastBooking) {
      setBookingData(JSON.parse(lastBooking))
    }
  }, [])

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">Loading booking details...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">
              Bright Hotel
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for choosing Bright Hotel. Your reservation has been confirmed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Booking ID</div>
                  <div className="font-semibold">{bookingData.booking_id}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Status</div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Confirmed</Badge>
                </div>
                <div>
                  <div className="text-muted-foreground">Room</div>
                  <div className="font-medium">{bookingData.room_name}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Guests</div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {bookingData.guests} guest{bookingData.guests > 1 ? "s" : ""}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Check-in</div>
                  <div className="font-medium">{bookingData.check_in}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Check-out</div>
                  <div className="font-medium">{bookingData.check_out}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Nights</div>
                  <div className="font-medium">{bookingData.nights}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Total Amount</div>
                  <div className="font-bold text-lg">${bookingData.total_amount}</div>
                </div>
              </div>

              {bookingData.guest_info?.special_requests && (
                <div>
                  <div className="text-muted-foreground text-sm">Special Requests</div>
                  <div className="text-sm bg-muted rounded p-2 mt-1">{bookingData.guest_info.special_requests}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Guest Information */}
          <Card>
            <CardHeader>
              <CardTitle>Guest Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Name</div>
                  <div className="font-medium">{bookingData.guest_info?.name}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Email</div>
                  <div className="font-medium">{bookingData.guest_info?.email}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Phone</div>
                  <div className="font-medium">{bookingData.guest_info?.phone}</div>
                </div>
                {bookingData.guest_info?.address && (
                  <div>
                    <div className="text-muted-foreground">Address</div>
                    <div className="font-medium">{bookingData.guest_info.address}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Information */}
        {tx_ref && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Transaction Reference</div>
                  <div className="font-mono text-xs break-all">{tx_ref}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Payment Status</div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {status === "successful" ? "Successful" : "Completed"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Important Information */}
        <Alert className="mt-8">
          <AlertDescription>
            A confirmation email has been sent to {bookingData.guest_info?.email}. Please save this page or take a
            screenshot for your records.
          </AlertDescription>
        </Alert>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Hotel Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-muted-foreground">Kigali, Rwanda</div>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-muted-foreground">+250 788 320 921</div>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-muted-foreground">brighthotelapartment@gmail.com</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button asChild className="flex-1">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href="/contact">Contact Hotel</Link>
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent" onClick={() => window.print()}>
            <Download className="h-4 w-4 mr-2" />
            Print Confirmation
          </Button>
        </div>

        {/* Check-in Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Check-in Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">
                1
              </div>
              <div>
                <div className="font-medium">Arrive at the hotel</div>
                <div className="text-muted-foreground">Check-in time is from 2:00 PM onwards</div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">
                2
              </div>
              <div>
                <div className="font-medium">Present your ID and booking confirmation</div>
                <div className="text-muted-foreground">Show this confirmation and a valid ID at reception</div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">
                3
              </div>
              <div>
                <div className="font-medium">Enjoy your stay!</div>
                <div className="text-muted-foreground">Our staff will be happy to assist you during your visit</div>
              </div>
            </div>
          </CardContent>
        </Card>
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
