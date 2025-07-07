"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Users,
  Package,
  MapPin,
  Calendar,
  DollarSign,
  Eye,
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "GHC 45,231",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Users",
    value: "2,350",
    change: "+180",
    trend: "up",
    icon: Users,
  },
  {
    title: "Products Sold",
    value: "12,234",
    change: "+19%",
    trend: "up",
    icon: Package,
  },
  {
    title: "Consultations",
    value: "573",
    change: "-2%",
    trend: "down",
    icon: Calendar,
  },
];

const quickActions = [
  {
    title: "Add New Product",
    description: "Add seedlings or farming supplies",
    href: "/admin/products/new",
    icon: Package,
  },
  {
    title: "List Farmland",
    description: "Add new farmland listing",
    href: "/admin/farmlands/new",
    icon: MapPin,
  },
  {
    title: "Send Newsletter",
    description: "Create and send newsletter",
    href: "/admin/newsletter/new",
    icon: Eye,
  },
  {
    title: "Post a Blog",
    description: "Post a new blog",
    href: "/admin/blogs",
    icon: Calendar,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your agricultural business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.title}
                    variant="outline"
                    className="h-auto w-full justify-start bg-transparent p-4"
                    asChild
                  >
                    <Link href={action.href}>
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <div className="text-left">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-muted-foreground text-xs">
                            {action.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
