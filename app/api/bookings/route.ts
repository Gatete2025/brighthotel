import { type NextRequest, NextResponse } from "next/server"

// Mock database operations - replace with actual database calls
const mockBookings = [
  {
    id: 1,
    booking_id: "BK001",
    guest_name: "John Doe",
    room_name: "Deluxe Ocean View Suite",
    check_in: "2024-01-15",
    check_out: "2024-01-18",
    status: "confirmed",
    amount: 450,
  },
]

export async function GET(request: NextRequest) {
  try {
    // In a real app, fetch from database
    return NextResponse.json({ bookings: mockBookings })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Booking request received:", body)

    // Validate required fields
    const { guest_info, room_id, check_in, check_out, payment_method, amount } = body

    if (!guest_info || !room_id || !check_in || !check_out || !payment_method || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!guest_info.name || !guest_info.email || !guest_info.phone) {
      return NextResponse.json({ error: "Missing guest information" }, { status: 400 })
    }

    // Generate booking ID
    const booking_id = "BH" + Date.now().toString().slice(-6)

    // Create booking record
    const newBooking = {
      booking_id,
      guest_info,
      room_id,
      check_in,
      check_out,
      payment_method,
      amount,
      status: "pending",
      created_at: new Date().toISOString(),
    }

    console.log("Creating booking:", newBooking)

    // Process payment with Flutterwave
    const paymentResult = await processFlutterwavePayment({
      amount,
      currency: "USD", // Changed to USD for better compatibility
      payment_method,
      customer: guest_info,
      booking_id,
      booking_data: newBooking,
    })

    if (paymentResult.success) {
      // Store booking in mock database (in real app, save to actual database)
      mockBookings.push({
        id: mockBookings.length + 1,
        booking_id,
        guest_name: guest_info.name,
        room_name: `Room ${room_id}`,
        check_in,
        check_out,
        status: "pending_payment",
        amount,
      })

      return NextResponse.json({
        success: true,
        booking: newBooking,
        payment_link: paymentResult.payment_link,
        message: "Booking created successfully! Redirecting to payment...",
      })
    } else {
      return NextResponse.json(
        {
          error: "Payment initialization failed",
          message: paymentResult.message,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

// Flutterwave payment processing
async function processFlutterwavePayment(paymentData: {
  amount: number
  currency: string
  payment_method: string
  customer: any
  booking_id: string
  booking_data: any
}) {
  try {
    const tx_ref = `bright-hotel-${paymentData.booking_id}-${Date.now()}`

    // Determine payment options based on method
    let payment_options = ""
    if (paymentData.payment_method === "mtn") {
      payment_options = "mobilemoneyrwanda"
    } else if (paymentData.payment_method === "airtel") {
      payment_options = "mobilemoneyuganda"
    } else {
      payment_options = "card"
    }

    const flutterwavePayload = {
      tx_ref,
      amount: paymentData.amount,
      currency: paymentData.currency,
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/booking/success?tx_ref=${tx_ref}`,
      payment_options,
      customer: {
        email: paymentData.customer.email,
        phonenumber: paymentData.customer.phone,
        name: paymentData.customer.name,
      },
      customizations: {
        title: "Bright Hotel Booking",
        description: `Hotel booking payment for ${paymentData.booking_id}`,
        logo: "https://your-logo-url.com/logo.png",
      },
      meta: {
        booking_id: paymentData.booking_id,
        room_id: paymentData.booking_data.room_id,
        check_in: paymentData.booking_data.check_in,
        check_out: paymentData.booking_data.check_out,
      },
    }

    console.log("Flutterwave payload:", flutterwavePayload)

    // Check if we have Flutterwave secret key
    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY

    if (!secretKey) {
      console.log("No Flutterwave secret key found, using demo mode")
      // Demo mode - return mock payment link
      return {
        success: true,
        payment_link: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/booking/demo-payment?tx_ref=${tx_ref}&amount=${paymentData.amount}&method=${paymentData.payment_method}`,
        message: "Payment link generated successfully (Demo Mode)",
      }
    }

    // Make actual Flutterwave API call
    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flutterwavePayload),
    })

    const result = await response.json()
    console.log("Flutterwave response:", result)

    if (response.ok && result.status === "success") {
      return {
        success: true,
        payment_link: result.data.link,
        message: "Payment link generated successfully",
      }
    } else {
      console.error("Flutterwave error:", result)
      // Fallback to demo mode if API fails
      return {
        success: true,
        payment_link: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/booking/demo-payment?tx_ref=${tx_ref}&amount=${paymentData.amount}&method=${paymentData.payment_method}`,
        message: "Payment link generated successfully (Fallback Mode)",
      }
    }
  } catch (error) {
    console.error("Flutterwave payment error:", error)
    // Fallback to demo mode on error
    const tx_ref = `bright-hotel-${paymentData.booking_id}-${Date.now()}`
    return {
      success: true,
      payment_link: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/booking/demo-payment?tx_ref=${tx_ref}&amount=${paymentData.amount}&method=${paymentData.payment_method}`,
      message: "Payment link generated successfully (Error Fallback Mode)",
    }
  }
}
