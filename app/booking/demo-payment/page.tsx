"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CreditCard, Smartphone, CheckCircle, XCircle } from "lucide-react"

export default function DemoPaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<"processing" | "success" | "failed">("processing")

  const tx_ref = searchParams.get("tx_ref")
  const amount = searchParams.get("amount")
  const method = searchParams.get("method")

  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      // 90% success rate for demo
      const success = Math.random() > 0.1
      setPaymentStatus(success ? "success" : "failed")
      setIsProcessing(false)

      if (success) {
        // Redirect to success page after 2 seconds
        setTimeout(() => {
          router.push(`/booking/success?tx_ref=${tx_ref}&status=successful`)
        }, 2000)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [tx_ref, router])

  const getPaymentMethodIcon = () => {
    if (method === "mtn") {
      return <Smartphone className="h-8 w-8 text-yellow-600" />
    } else if (method === "airtel") {
      return <Smartphone className="h-8 w-8 text-red-600" />
    }
    return <CreditCard className="h-8 w-8 text-primary" />
  }

  const getPaymentMethodName = () => {
    if (method === "mtn") return "MTN Mobile Money"
    if (method === "airtel") return "Airtel Money"
    return "Card Payment"
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Payment Processing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Method */}
          <div className="flex items-center justify-center space-x-3">
            {getPaymentMethodIcon()}
            <div>
              <div className="font-medium">{getPaymentMethodName()}</div>
              <div className="text-sm text-muted-foreground">Demo Payment Mode</div>
            </div>
          </div>

          {/* Amount */}
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Amount to Pay</div>
            <Badge className="text-lg font-bold mt-1">${amount}</Badge>
          </div>

          {/* Transaction Reference */}
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Transaction Reference</div>
            <div className="text-xs font-mono mt-1 break-all">{tx_ref}</div>
          </div>

          {/* Status */}
          <div className="text-center">
            {paymentStatus === "processing" && (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <div>
                  <div className="font-medium">Processing Payment...</div>
                  <div className="text-sm text-muted-foreground">Please wait while we process your payment</div>
                </div>
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="space-y-4">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                <div>
                  <div className="font-medium text-green-600">Payment Successful!</div>
                  <div className="text-sm text-muted-foreground">Redirecting to confirmation page...</div>
                </div>
              </div>
            )}

            {paymentStatus === "failed" && (
              <div className="space-y-4">
                <XCircle className="h-12 w-12 text-red-600 mx-auto" />
                <div>
                  <div className="font-medium text-red-600">Payment Failed</div>
                  <div className="text-sm text-muted-foreground">There was an issue processing your payment</div>
                </div>
                <div className="space-y-2">
                  <Button asChild className="w-full">
                    <Link href="/booking">Try Again</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Demo Notice */}
          <div className="bg-muted rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">
              <strong>Demo Mode:</strong> This is a simulated payment for demonstration purposes. No actual payment will
              be processed.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
