"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader } from "lucide-react";

import {
  LoginFormState,
  validateLogin,
} from "@/actions/auth/login/loginFormValidation";
import { useRouter, useSearchParams } from "next/navigation";
import { FaApple, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams().get("product") || "";

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [isLoading, setIsLoading] = useState<boolean>();

  const handleSocialLogin = async (provider: "google" | "apple") => {
    try {
    } catch (error) {
    } finally {
    }
  };

  const initialState: LoginFormState = {
    formErrors: {},
    success: false,
    errorMessage: null,
  };
  const [state, formAction, isPending] = useActionState(
    validateLogin,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      setFormData({ email: "", password: "", rememberMe: false });
      router.replace(`/`);
    }
  }, [state, router]);

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
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <p className="text-muted-foreground">
                Sign in to your account to continue
              </p>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                {state.errorMessage && (
                  <div className="text-destructive rounded-md border border-red-200 bg-red-50 p-3 text-center text-sm">
                    {state.errorMessage}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                  {state.formErrors.email && (
                    <p className="text-destructive text-xs">
                      {state.formErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="pr-10 pl-10"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 transform"
                    >
                      {showPassword ? (
                        <EyeOff className="text-muted-foreground h-4 w-4" />
                      ) : (
                        <Eye className="text-muted-foreground h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {state.formErrors.password && (
                    <p className="text-destructive text-xs">
                      {state.formErrors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        handleInputChange("rememberMe", checked as boolean)
                      }
                    />
                    <label
                      htmlFor="remember"
                      className="text-muted-foreground text-sm"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/auth/forgot-password"
                    className="text-primary text-sm hover:underline"
                  >
                    Forgot password?
                  </Link>
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
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Social Login Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading || isPending}
                >
                  <FaGoogle className="mr-2 h-5 w-5" />
                  Continue with Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={() => handleSocialLogin("apple")}
                  disabled={isLoading || isPending}
                >
                  <FaApple className="mr-2 h-5 w-5" />
                  Continue with Apple
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-xs">
                  Don't have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden flex-1 lg:flex">
        <Image
          src="/img/auth/login.jpg"
          alt="Agricultural landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute right-8 bottom-8 left-8 text-white">
          <Badge
            variant="secondary"
            className="mb-4 border-white/30 bg-white/20 text-white"
          >
            Join Our Community
          </Badge>
          <h2 className="mb-4 text-3xl font-bold">
            Grow Your Agricultural Success
          </h2>
          <p className="text-lg opacity-90">
            Access premium seedlings, expert consultation, and farmland
            solutions to transform your agricultural business.
          </p>
        </div>
      </div>
    </div>
  );
}
