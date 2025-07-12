"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, User, Loader2, Shield } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check credentials - in production, this would be a secure API call
      if (
        (formData.username === "admin" && formData.password === "admin123") ||
        (formData.username === "manager" && formData.password === "manager123") ||
        (formData.username === "staff" && formData.password === "staff123")
      ) {
        // Determine user role
        let role = "staff"
        if (formData.username === "admin") role = "admin"
        if (formData.username === "manager") role = "manager"

        // Store authentication data
        localStorage.setItem("admin_logged_in", "true")
        localStorage.setItem("admin_username", formData.username)
        localStorage.setItem("admin_role", role)
        localStorage.setItem("admin_login_time", new Date().toISOString())

        toast({
          title: "Login Successful",
          description: `Welcome back, ${formData.username}! Redirecting to dashboard...`,
        })

        // Redirect to admin dashboard
        setTimeout(() => {
          router.push("/admin")
        }, 1000)
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password. Please check your credentials and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-primary">
            Bright Hotel
          </Link>
          <div className="flex items-center justify-center mt-2">
            <Shield className="h-5 w-5 text-primary mr-2" />
            <p className="text-muted-foreground">Admin Portal</p>
          </div>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="pl-10"
                    placeholder="Enter your username"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <Alert className="mt-6">
              <AlertDescription>
                <div className="text-sm space-y-2">
                  <div className="font-semibold">Demo Credentials:</div>
                  <div className="space-y-1">
                    <div>
                      <strong>Admin:</strong> admin / admin123
                    </div>
                    <div>
                      <strong>Manager:</strong> manager / manager123
                    </div>
                    <div>
                      <strong>Staff:</strong> staff / staff123
                    </div>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-primary hover:underline">
                ← Back to Website
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            This is a secure admin portal. All activities are logged and monitored.
          </p>
        </div>
      </div>
    </div>
  )
}
