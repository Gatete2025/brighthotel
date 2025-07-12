"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  UserCheck,
  Clock,
  Shield,
  AlertTriangle,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")

  // Mock data states
  const [bookings, setBookings] = useState([
    {
      id: 1,
      booking_id: "BH001",
      guest_name: "John Doe",
      guest_email: "john.doe@email.com",
      guest_phone: "+250 788 123 456",
      room_name: "Presidential Suite",
      room_id: "1",
      check_in: "2024-01-15",
      check_out: "2024-01-18",
      guests: 2,
      status: "confirmed",
      amount: 750,
      payment_method: "mtn",
      payment_status: "paid",
      created_at: "2024-01-10",
    },
    {
      id: 2,
      booking_id: "BH002",
      guest_name: "Jane Smith",
      guest_email: "jane.smith@email.com",
      guest_phone: "+250 788 234 567",
      room_name: "Deluxe Ocean View",
      room_id: "2",
      check_in: "2024-01-20",
      check_out: "2024-01-23",
      guests: 2,
      status: "pending",
      amount: 540,
      payment_method: "airtel",
      payment_status: "pending",
      created_at: "2024-01-12",
    },
    {
      id: 3,
      booking_id: "BH003",
      guest_name: "Mike Johnson",
      guest_email: "mike.johnson@email.com",
      guest_phone: "+250 788 345 678",
      room_name: "Executive Business",
      room_id: "3",
      check_in: "2024-01-25",
      check_out: "2024-01-27",
      guests: 1,
      status: "checked-in",
      amount: 240,
      payment_method: "mtn",
      payment_status: "paid",
      created_at: "2024-01-14",
    },
  ])

  const [rooms, setRooms] = useState([
    {
      id: "1",
      name: "Presidential Suite",
      type: "Suite",
      price: 250,
      capacity: 2,
      status: "available",
      floor: 10,
      amenities: ["King Bed", "Living Room", "City View", "Mini Bar"],
    },
    {
      id: "2",
      name: "Deluxe Ocean View",
      type: "Suite",
      price: 180,
      capacity: 2,
      status: "occupied",
      floor: 8,
      amenities: ["Queen Bed", "Ocean View", "Mini Bar", "Balcony"],
    },
    {
      id: "3",
      name: "Executive Business",
      type: "Room",
      price: 120,
      capacity: 2,
      status: "maintenance",
      floor: 5,
      amenities: ["Queen Bed", "Work Desk", "High-Speed WiFi"],
    },
  ])

  const [guests, setGuests] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+250 788 123 456",
      address: "Kigali, Rwanda",
      total_bookings: 3,
      total_spent: 1250,
      last_visit: "2024-01-15",
      vip_status: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+250 788 234 567",
      address: "Kampala, Uganda",
      total_bookings: 1,
      total_spent: 540,
      last_visit: "2024-01-20",
      vip_status: false,
    },
  ])

  const [stats, setStats] = useState({
    totalBookings: 156,
    totalRevenue: 45280,
    occupancyRate: 78,
    avgRating: 4.8,
    todayCheckIns: 8,
    todayCheckOuts: 5,
    availableRooms: 12,
    maintenanceRooms: 2,
  })

  // Form states
  const [newBooking, setNewBooking] = useState({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    room_id: "",
    check_in: "",
    check_out: "",
    guests: "1",
    special_requests: "",
  })

  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "Room",
    price: "",
    capacity: "2",
    floor: "",
    amenities: "",
  })

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("admin_logged_in") === "true"
      const storedUsername = localStorage.getItem("admin_username") || ""
      const storedRole = localStorage.getItem("admin_role") || ""

      if (!isLoggedIn) {
        router.push("/login")
        return
      }

      setIsAuthenticated(true)
      setUsername(storedUsername)
      setUserRole(storedRole)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in")
    localStorage.removeItem("admin_username")
    localStorage.removeItem("admin_role")
    localStorage.removeItem("admin_login_time")

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  const handleBookingStatusChange = (bookingId: number, newStatus: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)),
    )
    toast({
      title: "Booking Updated",
      description: `Booking status changed to ${newStatus}`,
    })
  }

  const handleRoomStatusChange = (roomId: string, newStatus: string) => {
    setRooms((prev) => prev.map((room) => (room.id === roomId ? { ...room, status: newStatus } : room)))
    toast({
      title: "Room Updated",
      description: `Room status changed to ${newStatus}`,
    })
  }

  const handleDeleteBooking = (bookingId: number) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
    toast({
      title: "Booking Deleted",
      description: "Booking has been successfully deleted.",
    })
  }

  const handleCreateBooking = () => {
    if (!newBooking.guest_name || !newBooking.guest_email || !newBooking.room_id) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const booking = {
      id: bookings.length + 1,
      booking_id: `BH${String(bookings.length + 1).padStart(3, "0")}`,
      ...newBooking,
      room_name: rooms.find((r) => r.id === newBooking.room_id)?.name || "Unknown Room",
      status: "confirmed",
      amount: rooms.find((r) => r.id === newBooking.room_id)?.price || 0,
      payment_method: "cash",
      payment_status: "pending",
      created_at: new Date().toISOString().split("T")[0],
    }

    setBookings((prev) => [...prev, booking])
    setNewBooking({
      guest_name: "",
      guest_email: "",
      guest_phone: "",
      room_id: "",
      check_in: "",
      check_out: "",
      guests: "1",
      special_requests: "",
    })

    toast({
      title: "Booking Created",
      description: `Booking ${booking.booking_id} has been created successfully.`,
    })
  }

  const handleCreateRoom = () => {
    if (!newRoom.name || !newRoom.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const room = {
      id: String(rooms.length + 1),
      ...newRoom,
      price: Number(newRoom.price),
      capacity: Number(newRoom.capacity),
      floor: Number(newRoom.floor),
      status: "available",
      amenities: newRoom.amenities.split(",").map((a) => a.trim()),
    }

    setRooms((prev) => [...prev, room])
    setNewRoom({
      name: "",
      type: "Room",
      price: "",
      capacity: "2",
      floor: "",
      amenities: "",
    })

    toast({
      title: "Room Created",
      description: `Room ${room.name} has been created successfully.`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "checked-in":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "checked-out":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "occupied":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "maintenance":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
      case "cleaning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const canAccess = (requiredRole: string) => {
    const roleHierarchy = { admin: 3, manager: 2, staff: 1 }
    const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0
    return userLevel >= requiredLevel
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-primary">
                Bright Hotel Admin
              </Link>
              <Badge variant="secondary" className="text-xs">
                {userRole.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Welcome, <span className="font-medium text-foreground">{username}</span>
              </div>
              <ThemeToggle />
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your hotel operations and monitor performance</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings" disabled={!canAccess("admin")}>
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="flex items-center p-6">
                  <Calendar className="h-8 w-8 text-blue-600 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalBookings}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <DollarSign className="h-8 w-8 text-green-600 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <Users className="h-8 w-8 text-purple-600 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
                    <p className="text-2xl font-bold text-foreground">{stats.occupancyRate}%</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <TrendingUp className="h-8 w-8 text-orange-600 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                    <p className="text-2xl font-bold text-foreground">{stats.avgRating}/5</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Overview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="flex items-center p-6">
                  <UserCheck className="h-8 w-8 text-green-600 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Today's Check-ins</p>
                    <p className="text-2xl font-bold text-foreground">{stats.todayCheckIns}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <Clock className="h-8 w-8 text-blue-600 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Today's Check-outs</p>
                    <p className="text-2xl font-bold text-foreground">{stats.todayCheckOuts}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <Shield className="h-8 w-8 text-green-600 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available Rooms</p>
                    <p className="text-2xl font-bold text-foreground">{stats.availableRooms}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center p-6">
                  <AlertTriangle className="h-8 w-8 text-orange-600 mr-4" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
                    <p className="text-2xl font-bold text-foreground">{stats.maintenanceRooms}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.slice(0, 5).map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.booking_id}</TableCell>
                        <TableCell>{booking.guest_name}</TableCell>
                        <TableCell>{booking.room_name}</TableCell>
                        <TableCell>{booking.check_in}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </TableCell>
                        <TableCell>${booking.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Booking Management</CardTitle>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Booking
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New Booking</DialogTitle>
                        <DialogDescription>Add a new booking to the system</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="guest_name">Guest Name</Label>
                          <Input
                            id="guest_name"
                            value={newBooking.guest_name}
                            onChange={(e) => setNewBooking({ ...newBooking, guest_name: e.target.value })}
                            placeholder="Enter guest name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="guest_email">Email</Label>
                          <Input
                            id="guest_email"
                            type="email"
                            value={newBooking.guest_email}
                            onChange={(e) => setNewBooking({ ...newBooking, guest_email: e.target.value })}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <Label htmlFor="guest_phone">Phone</Label>
                          <Input
                            id="guest_phone"
                            value={newBooking.guest_phone}
                            onChange={(e) => setNewBooking({ ...newBooking, guest_phone: e.target.value })}
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div>
                          <Label htmlFor="room_id">Room</Label>
                          <Select
                            value={newBooking.room_id}
                            onValueChange={(value) => setNewBooking({ ...newBooking, room_id: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select room" />
                            </SelectTrigger>
                            <SelectContent>
                              {rooms
                                .filter((room) => room.status === "available")
                                .map((room) => (
                                  <SelectItem key={room.id} value={room.id}>
                                    {room.name} - ${room.price}/night
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="check_in">Check-in</Label>
                            <Input
                              id="check_in"
                              type="date"
                              value={newBooking.check_in}
                              onChange={(e) => setNewBooking({ ...newBooking, check_in: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="check_out">Check-out</Label>
                            <Input
                              id="check_out"
                              type="date"
                              value={newBooking.check_out}
                              onChange={(e) => setNewBooking({ ...newBooking, check_out: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="guests">Guests</Label>
                          <Select
                            value={newBooking.guests}
                            onValueChange={(value) => setNewBooking({ ...newBooking, guests: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} Guest{num > 1 ? "s" : ""}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="special_requests">Special Requests</Label>
                          <Textarea
                            id="special_requests"
                            value={newBooking.special_requests}
                            onChange={(e) => setNewBooking({ ...newBooking, special_requests: e.target.value })}
                            placeholder="Any special requests..."
                          />
                        </div>
                        <Button onClick={handleCreateBooking} className="w-full">
                          Create Booking
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.booking_id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.guest_name}</div>
                            <div className="text-sm text-muted-foreground">{booking.guests} guests</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{booking.guest_email}</div>
                            <div className="text-muted-foreground">{booking.guest_phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{booking.room_name}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>In: {booking.check_in}</div>
                            <div>Out: {booking.check_out}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={booking.status}
                            onValueChange={(value) => handleBookingStatusChange(booking.id, value)}
                            disabled={!canAccess("manager")}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="checked-in">Checked In</SelectItem>
                              <SelectItem value="checked-out">Checked Out</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <Badge className={getStatusColor(booking.payment_status)}>{booking.payment_status}</Badge>
                            <div className="text-muted-foreground mt-1">{booking.payment_method.toUpperCase()}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">${booking.amount}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" disabled={!canAccess("manager")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteBooking(booking.id)}
                              disabled={!canAccess("admin")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Room Management</CardTitle>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button disabled={!canAccess("manager")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Room
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Room</DialogTitle>
                        <DialogDescription>Create a new room in the system</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="room_name">Room Name</Label>
                          <Input
                            id="room_name"
                            value={newRoom.name}
                            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                            placeholder="Enter room name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="room_type">Room Type</Label>
                          <Select
                            value={newRoom.type}
                            onValueChange={(value) => setNewRoom({ ...newRoom, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Room">Room</SelectItem>
                              <SelectItem value="Suite">Suite</SelectItem>
                              <SelectItem value="Apartment">Apartment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="room_price">Price per Night</Label>
                            <Input
                              id="room_price"
                              type="number"
                              value={newRoom.price}
                              onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="room_capacity">Capacity</Label>
                            <Select
                              value={newRoom.capacity}
                              onValueChange={(value) => setNewRoom({ ...newRoom, capacity: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num} guests
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="room_floor">Floor</Label>
                          <Input
                            id="room_floor"
                            type="number"
                            value={newRoom.floor}
                            onChange={(e) => setNewRoom({ ...newRoom, floor: e.target.value })}
                            placeholder="Floor number"
                          />
                        </div>
                        <div>
                          <Label htmlFor="room_amenities">Amenities (comma-separated)</Label>
                          <Textarea
                            id="room_amenities"
                            value={newRoom.amenities}
                            onChange={(e) => setNewRoom({ ...newRoom, amenities: e.target.value })}
                            placeholder="WiFi, TV, Mini Bar, etc."
                          />
                        </div>
                        <Button onClick={handleCreateRoom} className="w-full">
                          Create Room
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">#{room.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{room.name}</div>
                            <div className="text-sm text-muted-foreground">{room.amenities.slice(0, 2).join(", ")}</div>
                          </div>
                        </TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell className="font-medium">${room.price}/night</TableCell>
                        <TableCell>{room.capacity} guests</TableCell>
                        <TableCell>Floor {room.floor}</TableCell>
                        <TableCell>
                          <Select
                            value={room.status}
                            onValueChange={(value) => handleRoomStatusChange(room.id, value)}
                            disabled={!canAccess("staff")}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="occupied">Occupied</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="cleaning">Cleaning</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" disabled={!canAccess("manager")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" disabled={!canAccess("admin")}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guests Tab */}
          <TabsContent value="guests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Guest Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guests.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell className="font-medium">#{guest.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium">{guest.name}</div>
                              {guest.vip_status && <Badge className="text-xs bg-yellow-100 text-yellow-800">VIP</Badge>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{guest.email}</div>
                            <div className="text-muted-foreground">{guest.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{guest.address}</TableCell>
                        <TableCell>{guest.total_bookings}</TableCell>
                        <TableCell className="font-medium">${guest.total_spent}</TableCell>
                        <TableCell>{guest.last_visit}</TableCell>
                        <TableCell>
                          <Badge
                            className={guest.vip_status ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}
                          >
                            {guest.vip_status ? "VIP" : "Regular"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" disabled={!canAccess("manager")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>This Month</span>
                      <span className="font-bold">$12,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Month</span>
                      <span className="font-bold">$11,230</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth</span>
                      <span className="font-bold text-green-600">+10.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Occupancy Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Current Occupancy</span>
                      <span className="font-bold">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average This Month</span>
                      <span className="font-bold">82%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak Occupancy</span>
                      <span className="font-bold">95%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Export Reports</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Bookings Report
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Revenue Report
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Guest Report
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            {canAccess("admin") ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="hotel_name">Hotel Name</Label>
                      <Input id="hotel_name" defaultValue="Bright Hotel & Apartments" />
                    </div>
                    <div>
                      <Label htmlFor="hotel_email">Contact Email</Label>
                      <Input id="hotel_email" defaultValue="brighthotelapartment@gmail.com" />
                    </div>
                    <div>
                      <Label htmlFor="hotel_phone">Contact Phone</Label>
                      <Input id="hotel_phone" defaultValue="+250 788 320 921" />
                    </div>
                    <div>
                      <Label htmlFor="hotel_address">Address</Label>
                      <Input id="hotel_address" defaultValue="Kigali, Rwanda" />
                    </div>
                    <Button>Save Settings</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Admin Users</div>
                          <div className="text-sm text-muted-foreground">Manage admin access</div>
                        </div>
                        <Button variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Add User
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>You don't have permission to access system settings.</AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
