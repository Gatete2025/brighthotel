import { NextResponse } from "next/server"

const rooms = [
  {
    id: "1",
    name: "Presidential Suite",
    price: 250,
    description: "Our most luxurious suite with panoramic city views, separate living area, and premium amenities.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=500&fit=crop&crop=center",
    ],
    amenities: ["King Bed", "Living Room", "City View", "Mini Bar", "Work Desk", "Balcony"],
    capacity: 2,
    size: "75 sqm",
  },
  {
    id: "2",
    name: "Deluxe Ocean View Suite",
    price: 180,
    description: "Spacious suite with stunning ocean views, modern furnishings, and luxury bathroom.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=500&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop&crop=center",
    ],
    amenities: ["Queen Bed", "Ocean View", "Mini Bar", "Coffee Machine", "Balcony", "Safe"],
    capacity: 2,
    size: "55 sqm",
  },
  {
    id: "3",
    name: "Executive Business Room",
    price: 120,
    description: "Perfect for business travelers with dedicated work space and high-speed internet.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=500&fit=crop&crop=center",
    ],
    amenities: ["Queen Bed", "Work Desk", "High-Speed WiFi", "Coffee Machine", "City View", "Phone"],
    capacity: 2,
    size: "40 sqm",
  },
  {
    id: "4",
    name: "Family Apartment",
    price: 200,
    description: "Spacious apartment perfect for families with separate bedrooms and living area.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=500&fit=crop&crop=center",
    ],
    amenities: ["2 Bedrooms", "Living Room", "Kitchenette", "Dining Area", "Balcony", "Family Friendly"],
    capacity: 4,
    size: "80 sqm",
  },
  {
    id: "5",
    name: "Standard Double Room",
    price: 80,
    description: "Comfortable and affordable room with all essential amenities for a pleasant stay.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=500&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=500&fit=crop&crop=center",
    ],
    amenities: ["Double Bed", "Private Bathroom", "Air Conditioning", "TV", "WiFi", "Mini Fridge"],
    capacity: 2,
    size: "25 sqm",
  },
  {
    id: "6",
    name: "Luxury Penthouse",
    price: 350,
    description: "Ultimate luxury penthouse with private terrace, jacuzzi, and breathtaking city views.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=500&fit=crop&crop=center",
    ],
    amenities: ["King Bed", "Private Terrace", "Jacuzzi", "Living Room", "Kitchen", "City View"],
    capacity: 2,
    size: "120 sqm",
  },
]

export async function GET() {
  return NextResponse.json({ rooms })
}
