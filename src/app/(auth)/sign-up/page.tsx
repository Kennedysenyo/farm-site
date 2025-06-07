"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Loader,
} from "lucide-react";
import { FaApple, FaGoogle } from "react-icons/fa";
import {
  SignupFormState,
  validateSignUp,
} from "@/actions/auth/sign-up/signupFormValidation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialSignup = async (provider: "google" | "apple") => {
    try {
    } catch (error) {
    } finally {
    }
  };

  const initialState: SignupFormState = {
    formErrors: {},
    success: false,
    errorMessage: null,
  };
  const [state, formAction, isPending] = useActionState(
    validateSignUp,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      localStorage.setItem("signup_data", JSON.stringify(formData));

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
        subscribeNewsletter: false,
      });

      router.push("/verify-otp");
    }
  }, [state, router]);

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="relative hidden flex-1 lg:flex">
        <Image
          src="/img/auth/signup.jpg"
          alt="Agricultural landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute right-8 bottom-8 left-8 text-white">
          <h2 className="mb-4 text-3xl font-bold">
            Start Your Agricultural Journey
          </h2>
          <p className="mb-6 text-lg opacity-90">
            Join thousands of successful farmers who trust StartAgri for their
            agricultural needs.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm opacity-80">Happy Farmers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">100K+</div>
              <div className="text-sm opacity-80">Seedlings Sold</div>
            </div>
            <div>
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm opacity-80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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
              <span className="text-primary text-2xl font-bold">AgriGrow</span>
            </Link>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create Your Account</CardTitle>
              <p className="text-muted-foreground">
                Join our community of successful farmers
              </p>
            </CardHeader>
            <CardContent>
              {/* Social Signup Buttons */}
              <div className="mb-6 space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={() => handleSocialSignup("google")}
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
                  onClick={() => handleSocialSignup("apple")}
                  disabled={isLoading}
                >
                  <FaApple className="mr-2 h-5 w-5" />
                  Continue with Apple
                </Button>
              </div>

              {/* Social Login Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">
                    Or sign up with email
                  </span>
                </div>
              </div>

              <form action={formAction} className="space-y-4">
                {state.errorMessage && (
                  <div className="rounded-md border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600">
                    {state.errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                      <Input
                        id="first-name"
                        name="first-name"
                        placeholder="eg. John"
                        className="pl-10"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                      />
                    </div>
                    {state.formErrors.firstName && (
                      <p className="text-xs text-red-600">
                        {state.formErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                      <Input
                        id="last-name"
                        name="last-name"
                        placeholder="eg. Doe"
                        className="pl-10"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                      />
                    </div>
                    {state.formErrors.lastName && (
                      <p className="text-xs text-red-600">
                        {state.formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="eg. johndoe@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                  {state.formErrors.email && (
                    <p className="text-xs text-red-600">
                      {state.formErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+233 123 456 789"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </div>
                  {state.formErrors.phone && (
                    <p className="text-xs text-red-600">
                      {state.formErrors.phone}
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
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
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
                    <p className="text-xs text-red-600">
                      {state.formErrors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirm-password"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      id="confirm-password"
                      name="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pr-10 pl-10"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-1/2 right-3 -translate-y-1/2 transform"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="text-muted-foreground h-4 w-4" />
                      ) : (
                        <Eye className="text-muted-foreground h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {state.formErrors.confirmPassword && (
                    <p className="text-xs text-red-600">
                      {state.formErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeToTerms", checked as boolean)
                      }
                      className={`${state.formErrors.agreeToTerms ? "border-destructive border" : ""} mt-1`}
                    />
                    <label
                      htmlFor="terms"
                      className="text-muted-foreground text-sm leading-relaxed"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  <Input
                    type="hidden"
                    name="agreeToTerms"
                    value={formData.agreeToTerms ? "yes" : ""}
                  />

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.subscribeNewsletter}
                      onCheckedChange={(checked) =>
                        handleInputChange(
                          "subscribeNewsletter",
                          checked as boolean,
                        )
                      }
                    />
                    <label
                      htmlFor="newsletter"
                      className="text-muted-foreground text-sm"
                    >
                      Subscribe to our newsletter for farming tips and updates
                    </label>
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
