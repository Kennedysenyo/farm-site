"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  User,
  Mail,
  Package,
  MapPin,
  Phone,
  Shield,
  Truck,
  Clock,
  Minus,
  Plus,
  CheckCircle,
} from "lucide-react";

type PaymentType = "stripe" | "paystack";

export default function OrderPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>("stripe");
  const [quantity, setQuantity] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  const pricePerUnit = 50;
  const total = quantity * pricePerUnit;
  const shipping = 25;
  const finalTotal = total + shipping;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 20) {
      setQuantity(newQuantity);
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold text-green-700">
              Order Confirmed!
            </h2>
            <p className="text-muted-foreground mb-4">
              Your order has been successfully placed. You'll receive a
              confirmation email shortly.
            </p>
            <Badge variant="secondary" className="mb-4">
              Order #ORD-2024-001
            </Badge>
            <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
              <Truck className="h-4 w-4" />
              <span>Estimated delivery: 3-5 business days</span>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Confirm Your Order
        </h1>
        <p className="text-muted-foreground mt-2">
          Review your order details and complete your purchase
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Order Form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      value="John Doe"
                      readOnly
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      value="johndoe@example.com"
                      readOnly
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      value="+233 24 123 4567"
                      readOnly
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <div className="relative">
                    <MapPin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="address"
                      type="text"
                      value="123 Main St, Accra, Ghana"
                      readOnly
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={paymentMethod}
                onValueChange={() =>
                  setPaymentMethod((prev) =>
                    prev === "stripe" ? "paystack" : "stripe",
                  )
                }
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <div className="relative">
                  <RadioGroupItem
                    value="stripe"
                    id="stripe"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="stripe"
                    className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex cursor-pointer items-center justify-between rounded-lg border-2 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <CreditCard className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Stripe</div>
                        <div className="text-muted-foreground text-sm">
                          Credit/Debit Card
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">Recommended</Badge>
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem
                    value="paystack"
                    id="paystack"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="paystack"
                    className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex cursor-pointer items-center justify-between rounded-lg border-2 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <Shield className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Paystack</div>
                        <div className="text-muted-foreground text-sm">
                          Mobile Money & Cards
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {/* Payment Form */}
              <div className="mt-6">
                {paymentMethod === "stripe" ? (
                  <div className="border-muted-foreground/25 rounded-lg border border-dashed p-6 text-center">
                    <CreditCard className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                    <p className="text-muted-foreground text-sm">
                      Stripe payment form will be loaded here
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Secure payment processing with SSL encryption
                    </p>
                  </div>
                ) : (
                  <div className="border-muted-foreground/25 rounded-lg border border-dashed p-6 text-center">
                    <Shield className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                    <p className="text-muted-foreground text-sm">
                      Paystack payment button will appear here
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Pay with Mobile Money, Bank Transfer, or Card
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Product Details */}
              <div className="flex gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-100">
                  <Package className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Mango Seedlings</h4>
                  <p className="text-muted-foreground text-sm">
                    Premium quality grafted seedlings
                  </p>
                  <Badge variant="outline" className="mt-1">
                    In Stock
                  </Badge>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <Label>Quantity</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 20}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({quantity} items)</span>
                  <span>GHC {total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    Shipping
                  </span>
                  <span>GHC {shipping}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>GHC {finalTotal}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="mb-1 flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  Estimated Delivery
                </div>
                <p className="text-muted-foreground text-sm">
                  3-5 business days
                </p>
              </div>

              {/* Place Order Button */}
              <Button
                className="h-12 w-full text-lg"
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processing...
                  </div>
                ) : (
                  `Place Order • GHC ${finalTotal}`
                )}
              </Button>

              {/* Security Badge */}
              <div className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
                <Shield className="h-3 w-3" />
                <span>Secure checkout with SSL encryption</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
