"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Clock, Info, Upload, Check, ArrowRight, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import useUploadPaymentProof from "@/hooks/api/transactions/useUploadPaymentProof"
import useCreateTransaction from "@/hooks/api/transactions/useCreateTransaction"

// TypeScript interfaces
interface SelectedTicket {
  id: string;
  eventName: string;
  date: string;
  location: string;
  type: string;
  price: number;
  quantity: number;
  ticketId: string; // Added for API integration
}

interface TransactionResponse {
  message: string;
  data: {
    id: string;
    reciptNumber: string;
    status: string;
    // Add other fields as needed
  };
}

export default function CheckoutPage() {
  // Mock data for selected tickets - in real app, this would come from props/context/state
  const selectedTickets: SelectedTicket[] = [
    {
      id: "1",
      eventName: "Tiket Hura - Hura",
      date: "20 Februari 2024",
      location: "Bandung",
      type: "VIP",
      price: 500000,
      quantity: 2,
      ticketId: "ticket_123", // This should come from your ticket selection
    },
  ]

  // Calculate total price
  const subtotal = selectedTickets.reduce((total, ticket) => total + ticket.price * ticket.quantity, 0)
  const serviceFee = subtotal * 0.05 // 5% service fee
  const total = subtotal + serviceFee

  // State for payment proof
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null)
  const [paymentNotes, setPaymentNotes] = useState("")
  const [currentStep, setCurrentStep] = useState(1)

  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60) // 2 hours in seconds

  // State for transaction
  const [transactionData, setTransactionData] = useState<{
    reciptNumber: string;
    id: string;
  } | null>(null)

  // Optional fields for transaction
  const [couponIds, setCouponIds] = useState<string[]>([])
  const [voucherId, setVoucherId] = useState<string>("")
  const [pointsUsed, setPointsUsed] = useState<number>(0)

  // Transaction hooks
  const createTransactionMutation = useCreateTransaction()
  const uploadPaymentProofMutation = useUploadPaymentProof()

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB")
        return
      }

      setPaymentProof(file)
      setPaymentProofPreview(URL.createObjectURL(file))
    }
  }

  // Handle transaction creation
  const handleCreateTransaction = () => {
    const tickets = selectedTickets.map(ticket => ({
      ticketId: ticket.ticketId,
      amount: ticket.price * ticket.quantity
    }))

    const payload = {
      tickets,
      ...(couponIds.length > 0 && { cuponID: couponIds }),
      ...(voucherId && { voucherID: voucherId }),
      ...(pointsUsed > 0 && { pointsUsed })
    }

    createTransactionMutation.mutate(payload, {
      onSuccess: (data: TransactionResponse) => {
        // Store transaction data for payment proof upload
        setTransactionData({
          reciptNumber: data.data.reciptNumber,
          id: data.data.id
        })
        setCurrentStep(2)
      }
    })
  }

  // Handle payment proof submission
  const handlePaymentProofSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!paymentProof || !transactionData) {
      toast.error("Payment proof and transaction data are required")
      return
    }

    uploadPaymentProofMutation.mutate({
      reciptNumber: transactionData.reciptNumber,
      imageTransactionFile: paymentProof
    }, {
      onSuccess: () => {
        setCurrentStep(3)
      }
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === 1) {
      handleCreateTransaction()
    } else if (currentStep === 2) {
      handlePaymentProofSubmit(e)
    }
  }

  // Format time for countdown
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0 || currentStep === 3) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, currentStep])

  return (
    <div className="min-h-screen bg-yellow-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-center">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="text-sm mt-2">Review</span>
            </div>
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="text-sm mt-2">Payment</span>
            </div>
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? "bg-purple-600 text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="text-sm mt-2">Confirmation</span>
            </div>
          </div>

          {/* Step 1: Review Order */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedTickets.map((ticket) => (
                      <div key={ticket.id} className="bg-white rounded-lg overflow-hidden border">
                        <div className="bg-purple-600 p-2 text-white">
                          <span className="font-bold">EVENT TICKET</span>
                        </div>
                        <div className="flex">
                          <div className="bg-purple-600 p-4 w-32 h-32 flex items-center justify-center">
                            <div className="relative w-full h-full">
                              <Image
                                src="/placeholder.svg?height=150&width=150"
                                alt="Event"
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                                IMAGE
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 bg-green-400 p-4 text-white">
                            <h3 className="font-bold text-lg">{ticket.eventName}</h3>
                            <div className="text-sm">{ticket.date}</div>
                            <div className="text-sm flex items-center">
                              <span className="inline-block w-4 h-4 bg-white rounded-full mr-1"></span>
                              {ticket.location}
                            </div>
                            <div className="text-sm">
                              {ticket.quantity} x ticket {ticket.type}
                            </div>
                            <div className="mt-2 font-bold">
                              IDR {(ticket.price * ticket.quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Optional: Add coupon/voucher/points section */}
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="voucher">Voucher Code (Optional)</Label>
                        <Input
                          id="voucher"
                          value={voucherId}
                          onChange={(e) => setVoucherId(e.target.value)}
                          placeholder="Enter voucher code"
                        />
                      </div>
                      <div>
                        <Label htmlFor="points">Use Points (Optional)</Label>
                        <Input
                          id="points"
                          type="number"
                          value={pointsUsed}
                          onChange={(e) => setPointsUsed(Number(e.target.value))}
                          placeholder="Enter points to use"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>IDR {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee (5%)</span>
                      <span>IDR {serviceFee.toLocaleString()}</span>
                    </div>
                    {pointsUsed > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Points Discount</span>
                        <span>-IDR {pointsUsed.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>IDR {Math.max(0, total - pointsUsed).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700" 
                    onClick={handleSubmit}
                    disabled={createTransactionMutation.isPending}
                  >
                    {createTransactionMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Transaction...
                      </>
                    ) : (
                      <>
                        Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Manual Payment</span>
                    <div className="flex items-center text-red-500">
                      <Clock className="mr-2 h-5 w-5" />
                      <span>{formatTime(timeLeft)}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-6 bg-yellow-100 border-yellow-300">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Payment Time Limit</AlertTitle>
                    <AlertDescription>
                      Please complete your payment within 2 hours. Your reservation will be automatically canceled if
                      payment is not received.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Payment Instructions</h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <div>
                          <p className="font-medium">Bank Transfer</p>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between">
                              <span>Bank Name</span>
                              <span className="font-medium">Bank Central Asia (BCA)</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Account Number</span>
                              <span className="font-medium">1234567890</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Account Name</span>
                              <span className="font-medium">PT Event Hub Indonesia</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Amount</span>
                              <span className="font-medium">IDR {Math.max(0, total - pointsUsed).toLocaleString()}</span>
                            </div>
                            {transactionData && (
                              <div className="flex justify-between">
                                <span>Receipt Number</span>
                                <span className="font-medium">{transactionData.reciptNumber}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="payment-proof">Upload Payment Proof</Label>
                          <div className="mt-1 flex items-center">
                            <Label
                              htmlFor="payment-proof"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                              {paymentProofPreview ? (
                                <div className="relative w-full h-full">
                                  <Image
                                    src={paymentProofPreview || "/placeholder.svg"}
                                    alt="Payment proof preview"
                                    fill
                                    className="object-contain p-2"
                                  />
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">PNG, JPG or PDF (MAX. 2MB)</p>
                                </div>
                              )}
                              <Input
                                id="payment-proof"
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={handleFileChange}
                                required
                              />
                            </Label>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="payment-notes">Payment Notes (Optional)</Label>
                          <Textarea
                            id="payment-notes"
                            placeholder="Add any additional information about your payment"
                            value={paymentNotes}
                            onChange={(e) => setPaymentNotes(e.target.value)}
                            className="mt-1"
                          />
                        </div>

                        <div className="pt-4">
                          <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            disabled={!paymentProof || uploadPaymentProofMutation.isPending}
                          >
                            {uploadPaymentProofMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading Payment Proof...
                              </>
                            ) : (
                              "Submit Payment Proof"
                            )}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Payment Submitted!</h2>
                    <p className="text-gray-600">
                      Your payment proof has been submitted successfully. We will process your payment and update your
                      ticket status.
                    </p>

                    <div className="bg-yellow-100 p-4 rounded-lg text-left mt-6">
                      <h3 className="font-medium text-yellow-800">What happens next?</h3>
                      <ul className="list-disc list-inside mt-2 text-sm text-yellow-800 space-y-1">
                        <li>Our team will verify your payment within {process.env.EXPIRED_ADMIN_CONFIRM_DEADLINE_DAY || '3'} days</li>
                        <li>You will receive an email notification once your payment is confirmed</li>
                        <li>Your tickets will be available in the "My Tickets" section</li>
                        <li>If payment is not confirmed within the deadline, your transaction will be automatically cancelled</li>
                      </ul>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild variant="outline">
                        <Link href="/my-ticket">View My Tickets</Link>
                      </Button>
                      <Button asChild className="bg-purple-600 hover:bg-purple-700">
                        <Link href="/explore">Browse More Events</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}