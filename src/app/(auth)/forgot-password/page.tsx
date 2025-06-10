"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, Loader, ArrowLeft } from "lucide-react";
import {
  FormState,
  validateForgotPassword,
} from "@/actions/auth/forgot-password/forgotPassword";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const initialState: FormState = {
    error: {},
    success: false,
    errorMessage: null,
  };
  const [state, formAction, isPending] = useActionState(
    validateForgotPassword,
    initialState,
  );
  useEffect(() => {
    setError(state.errorMessage);
  }, [state.errorMessage]);

  useEffect(() => {
    if (state.success) {
      setEmail("");
      router.push("/verify-otp");
    }
  }, [router, state]);

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Image
                src="/img/logo.png"
                alt="StartAgri Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-primary text-2xl font-bold">StartAgri</span>
            </Link>
          </div>

          <Card>
            <CardHeader className="text-center">
              <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Mail className="text-primary h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Forgot Password?</CardTitle>
              <p className="text-muted-foreground">
                No worries! Enter your email address and we'll send you a
                verification code to reset your password.
              </p>
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      className="pl-10"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  {state.error.email && (
                    <p className="text-destructive text-xs">
                      {state.error.email}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Sending Code...
                    </>
                  ) : (
                    <>
                      Send Verification Code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 space-y-4 text-center">
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Link>

                <div className="text-muted-foreground text-sm">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign up here
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden flex-1 lg:flex">
        <Image
          src="/img/auth/forgot-password.jpg"
          alt="Agricultural landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute right-8 bottom-8 left-8 text-white">
          <h2 className="mb-4 text-3xl font-bold">Secure Account Recovery</h2>
          <p className="text-lg opacity-90">
            We'll help you regain access to your account quickly and securely.
            Your agricultural journey continues with us.
          </p>
        </div>
      </div>
    </div>
  );
}
