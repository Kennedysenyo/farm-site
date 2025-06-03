"use client";

import {
  ChangeEvent,
  FormEvent,
  useActionState,
  useEffect,
  useState,
} from "react";
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
  Smartphone,
  Network,
  RadioReceiver,
  Antenna,
  Satellite,
  SatelliteDish,
} from "lucide-react";
import { ProductsType } from "@/db/schema";
import { OrderFormState, validateOrderForm } from "@/actions/orderValidation";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type PaymentType = "stripe" | "paystack";

export const OrderForm = ({ product }: { product: ProductsType }) => {
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deliveryAddress: "",
    paymentMethod: "momo",
    provider: "",
    quantity: 10,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const pricePerUnit = Number(product.price);
  const total = orderDetails.quantity * pricePerUnit;
  const shipping = 25;
  const finalTotal = total + shipping;

  useEffect(() => {
    setOrderDetails((prev) => ({ ...prev, priceTotal: finalTotal }));
  }, [finalTotal]);

  const initialState: OrderFormState = {
    errors: {},
    success: false,
    errorMessage: null,
  };

  const [state, formAction, isPending] = useActionState(
    validateOrderForm,
    initialState,
  );

  useEffect(() => {
    if (state.success) setOrderPlaced(true);
  }, [state]);

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

      {/* Main Order Form */}
      <form action={formAction} className="grid gap-8 lg:grid-cols-3">
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
                  <Label htmlFor="customerName">Full Name</Label>
                  <div className="relative">
                    <User className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="customerName"
                      name="customerName"
                      type="text"
                      placeholder="eg. John Doe"
                      value={orderDetails.customerName}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                    {state.errors.customerName && (
                      <p className="text-destructive text-xs">
                        {state.errors.customerName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email Address</Label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      placeholder="eg. johndoe@example.com"
                      value={orderDetails.customerEmail}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                    {state.errors.customerEmail && (
                      <p className="text-destructive text-xs">
                        {state.errors.customerEmail}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      placeholder="eg. 233 (0) 123456789"
                      value={orderDetails.customerPhone}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                    {state.errors.customerPhone && (
                      <p className="text-destructive text-xs">
                        {state.errors.customerPhone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <div className="relative">
                    <MapPin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="deliveryAddress"
                      name="deliveryAddress"
                      type="text"
                      value={orderDetails.deliveryAddress}
                      onChange={handleInputChange}
                      placeholder="eg. 123 Main St, Accra, Ghana"
                      className="pl-10"
                    />
                    {state.errors.deliveryAddress && (
                      <p className="text-destructive text-xs">
                        {state.errors.deliveryAddress}
                      </p>
                    )}
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
                value={orderDetails.paymentMethod}
                name="paymentMethod"
                onValueChange={() =>
                  setOrderDetails((prev) => ({
                    ...prev,
                    paymentMethod:
                      prev.paymentMethod === "momo" ? "card" : "momo",
                  }))
                }
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <div className="relative">
                  <RadioGroupItem
                    value="momo"
                    id="momo"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="momo"
                    className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex cursor-pointer items-center justify-between rounded-lg border-2 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <Smartphone className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Mobile Money</div>
                        <div className="text-muted-foreground text-sm">
                          MTN, Telecel, AT
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">Popular</Badge>
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="card"
                    className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex cursor-pointer items-center justify-between rounded-lg border-2 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <CreditCard className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Cards</div>
                        <div className="text-muted-foreground text-sm">
                          Credit/Debit Cards
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {/* Payment Form */}
              <div className="mt-6">
                {orderDetails.paymentMethod === "momo" ? (
                  <div className="border-muted-foreground/25 space-y-4 rounded-lg border border-dashed p-6 text-center">
                    <div className="space-y-2">
                      <Label htmlFor="provider">Provider</Label>
                      <div className="relative">
                        <SatelliteDish className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                        <Select
                          onValueChange={(value) =>
                            setOrderDetails((prev) => ({
                              ...prev,
                              provider: value,
                            }))
                          }
                        >
                          <SelectTrigger id="provider" className="w-full pl-10">
                            <SelectValue placeholder="Select a network" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Network</SelectLabel>
                              <SelectItem value="mtn">MTN</SelectItem>
                              <SelectItem value="telecel">Telecel</SelectItem>
                              <SelectItem value="at">AT</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Input
                          type="hidden"
                          name="provider"
                          value={orderDetails.provider}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="momo-number">Number</Label>
                      <div className="relative">
                        <Smartphone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                        <Input
                          id="momo-number"
                          name="momo-number"
                          type="tel"
                          placeholder="eg. 021xxxxxxx"
                          value={orderDetails.customerPhone}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                        {state.errors.customerPhone && (
                          <p className="text-destructive text-xs">
                            {state.errors.customerPhone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-muted-foreground/25 rounded-lg border border-dashed p-6 text-center">
                    <CreditCard className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
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
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-green-100">
                  <Image
                    src="/img/products/mango-seedling.jpg"
                    alt={product.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <Input type="hidden" name="product" value={product.name} />
                  <p className="text-muted-foreground text-sm">
                    {product.description}
                  </p>
                  <Badge variant="outline" className="mt-1">
                    {product.inStock && "In Stock"}
                  </Badge>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="quantity">Quantity</Label>
                {product.category.toLowerCase() === "seedlings" ? (
                  <div className="flex items-center">
                    <Input
                      id="quantity"
                      name="quantity"
                      value={orderDetails.quantity}
                      onChange={handleInputChange}
                      type="number"
                      min="10"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          quantity: prev.quantity - 1,
                        }))
                      }
                      disabled={orderDetails.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {orderDetails.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          quantity: prev.quantity + 1,
                        }))
                      }
                      disabled={orderDetails.quantity >= 20}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="hidden"
                      name="quantity"
                      value={orderDetails.quantity}
                    />
                  </div>
                )}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({orderDetails.quantity} items)</span>
                  <span>GHC {total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    Shipping
                  </span>
                  <span>GHC {shipping}</span>
                  <Input type="hidden" name="shipping" value={shipping} />
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>GHC {finalTotal}</span>
                  <Input type="hidden" name="priceTotal" value={finalTotal} />
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
                type="submit"
                className="h-12 w-full text-lg"
                disabled={isPending}
              >
                {isPending ? (
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
      </form>
    </section>
  );
};
