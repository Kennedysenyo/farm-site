"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, ArrowRight, Loader, Shield } from "lucide-react";
import { logOut } from "@/actions/auth/log-out/logout";
import {
  FormState,
  validateSetNewPassword,
} from "@/actions/auth/set-new-password/setNewPassword";
import { showToast } from "@/utils/showToast";

export const SetNewPassword = ({ email }: { email?: string }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if no email
  useEffect(() => {
    const checkEmail = async () => {
      if (!email) {
        await logOut();
      }
    };
    checkEmail();
  }, [email]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const initialState: FormState = {
    errors: {},
    success: false,
    errorMessage: null,
  };
  const [state, formAction, isPending] = useActionState(
    validateSetNewPassword,
    initialState,
  );

  useEffect(() => {
    const checkSuccess = async () => {
      if (state.success) {
        setFormData({ password: "", confirmPassword: "" });
        showToast(
          "success",
          "Password Changed",
          "You have successfully changed your password",
        );
      }
    };
    router.replace("/login");
    checkSuccess();
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
                <Shield className="text-primary h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Reset Your Password</CardTitle>
              <p className="text-muted-foreground">
                Create a new secure password for your account
                <br />
                <span className="text-foreground font-medium">{email}</span>
              </p>
              {state.errorMessage && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {state.errorMessage}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your new password"
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
                  {state.errors.password && (
                    <p className="text-xs text-red-600">
                      {state.errors.password}
                    </p>
                  )}

                  {/* Password Requirements */}
                  <div className="text-muted-foreground space-y-1 text-xs">
                    <p>Password must contain:</p>
                    <ul className="ml-2 list-inside list-disc space-y-1">
                      <li
                        className={
                          formData.password.length >= 8 ? "text-green-600" : ""
                        }
                      >
                        At least 8 characters
                      </li>
                      <li
                        className={
                          /[A-Z]/.test(formData.password)
                            ? "text-green-600"
                            : ""
                        }
                      >
                        One uppercase letter
                      </li>
                      <li
                        className={
                          /[a-z]/.test(formData.password)
                            ? "text-green-600"
                            : ""
                        }
                      >
                        One lowercase letter
                      </li>
                      <li
                        className={
                          /\d/.test(formData.password) ? "text-green-600" : ""
                        }
                      >
                        One number
                      </li>
                      <li
                        className={
                          /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
                            ? "text-green-600"
                            : ""
                        }
                      >
                        One special character
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      name="confirm-password"
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
                  {state.errors.confirmPassword && (
                    <p className="text-xs text-red-600">
                      {state.errors.confirmPassword}
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
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Remember your password?{" "}
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

      {/* Right Side - Image */}
      <div className="relative hidden flex-1 lg:flex">
        <Image
          src="/img/auth/set-new-password.jpg"
          alt="Agricultural landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute right-8 bottom-8 left-8 text-white">
          <h2 className="mb-4 text-3xl font-bold">Secure Your Account</h2>
          <p className="text-lg opacity-90">
            Create a strong password to protect your agricultural business data
            and continue your farming journey with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};
