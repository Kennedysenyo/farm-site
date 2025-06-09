"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader, Mail, RefreshCw } from "lucide-react";
import {
  OTPFormState,
  storeUserData,
  validateOTPForm,
} from "@/actions/auth/token/verifyToken";

export const VerifyOTP = ({
  token,
  email,
}: {
  token?: string;
  email: string;
}) => {
  const router = useRouter();

  const [isResending, setIsResending] = useState(false);
  const [resendResponse, setResendResponse] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [error, setError] = useState("");

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResendOTP = async () => {
    try {
      setIsResending(true);

      const response = await fetch("/api/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        if (!data) throw new Error("An Error Occured, try again.");
        setResendResponse(data);
      } else {
        const data = await response.json();
        if (!data) throw new Error("An Error Occured, try again.");
        setError(data.error.message);
      }

      // Todo: Show Toast
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setError(error.message);
      }
      setError(error as string);
    } finally {
      setIsResending(false);
    }
  };

  const initialState: OTPFormState = {
    formError: {},
    success: false,
    errorMessage: null,
  };
  const [state, formAction, isPending] = useActionState(
    validateOTPForm.bind(null, { type: token ? "signup" : "recovery", email }),
    initialState,
  );

  useEffect(() => {
    const finalise = async () => {
      if (state.success) {
        const data = JSON.parse(localStorage.getItem("signup_data")!);
        const { firstName, lastName, email, phone, subscribeNewsletter } = data;
        await storeUserData(
          firstName,
          lastName,
          email,
          phone,
          subscribeNewsletter,
        );
        localStorage.removeItem("signup_data");

        router.replace("/");
      }
    };
    finalise();
  }, [state, router, email, token]);

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
                alt="AgriGrow Logo"
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
              <CardTitle className="text-2xl">Verify Your Email</CardTitle>
              <p className="text-muted-foreground">
                {resendResponse
                  ? "Another verification code sent to"
                  : "We've sent a 6-digit verification code to"}
                <br />
                <span className="text-foreground font-medium">{email}</span>
              </p>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                {error && (
                  <div className="rounded-md border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600">
                    {error === "Invalid token"
                      ? "An error occured, try again"
                      : error}
                  </div>
                )}

                <div>
                  <label className="mb-3 block text-center text-sm font-medium">
                    Enter verification code
                  </label>
                  <div className="flex justify-center gap-2">
                    <Input
                      id="otp"
                      name="otp"
                      type="text"
                      inputMode="numeric"
                      className="text-center"
                    />
                    {state.formError.otp && (
                      <p className="text-xs text-red-600">
                        {state.formError.otp}
                      </p>
                    )}
                  </div>
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
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="space-y-3 text-center">
                  <p className="text-muted-foreground text-sm">
                    Code expires in:{" "}
                    <span className="text-foreground font-medium">
                      {formatTime(timeLeft)}
                    </span>
                  </p>

                  {timeLeft > 0 ? (
                    <Button
                      variant="ghost"
                      onClick={handleResendOTP}
                      disabled={isResending}
                      className="text-sm"
                    >
                      {isResending ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Resending...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Resend Code
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleResendOTP}
                      disabled={isResending}
                      className="text-sm"
                    >
                      {isResending ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Resending...
                        </>
                      ) : (
                        "Resend Code"
                      )}
                    </Button>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-muted-foreground text-sm">
                    Wrong email?{" "}
                    <Link
                      href="/sign-up"
                      className="text-primary hover:underline"
                    >
                      Go back
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden flex-1 lg:flex">
        <Image
          src="/img/auth/verify-otp.jpg"
          alt="Agricultural landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute right-8 bottom-8 left-8 text-white">
          <h2 className="mb-4 text-3xl font-bold">Almost There!</h2>
          <p className="text-lg opacity-90">
            Just one more step to join our community of successful farmers and
            access premium agricultural services.
          </p>
        </div>
      </div>
    </div>
  );
};
