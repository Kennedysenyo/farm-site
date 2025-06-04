"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Users,
  Clock,
  Award,
  Shield,
  Phone,
  Calendar,
  Star,
} from "lucide-react";
import { services, testimonials } from "@/utils/data";

export default function ServicesPage() {
  const ServiceCard = ({ service }: { service: (typeof services)[0] }) => {
    const Icon = service.icon;
    return (
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 rounded-lg p-3">
              <Icon className="text-primary h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <p className="text-muted-foreground">{service.subtitle}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{service.description}</p>
          <div className="space-y-2">
            {service.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <Button asChild className="w-full">
            <Link href={`#${service.id}`}>Learn More</Link>
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="from-primary/10 to-primary/5 bg-gradient-to-r px-4 py-16 md:px-10">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            Our Services
          </Badge>
          <h1 className="from-primary to-primary/70 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Complete Agricultural Solutions
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl">
            From premium seedlings to expert consultation and farmland solutions
            — we provide everything you need to succeed in agriculture.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contacts">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="px-4 py-20 md:px-10">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">What We Offer</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Comprehensive agricultural services designed to help you succeed
              at every stage of your farming journey.
            </p>
          </div>

          <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="bg-muted/30 px-4 py-20 md:px-10">
        <div className="container mx-auto">
          <Tabs defaultValue={services[0].id} className="w-full">
            <TabsList className="mb-12 grid w-full grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="text-sm"
                >
                  {service.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => {
              const Icon = service.icon;
              return (
                <TabsContent
                  key={service.id}
                  value={service.id}
                  className="space-y-12"
                >
                  <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 rounded-xl p-4">
                          <Icon className="text-primary h-10 w-10" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground text-lg">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-lg leading-relaxed">
                        {service.description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold">Key Features:</h4>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {service.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        width={600}
                        height={400}
                        className="w-full rounded-2xl object-cover shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-8">
                    <div className="text-center">
                      <h4 className="mb-2 text-2xl font-bold">
                        Service Packages
                      </h4>
                      <p className="text-muted-foreground">
                        Choose the package that best fits your needs
                      </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                      {Object.entries(service.pricing).map(([key, pkg]) => (
                        <Card
                          key={key}
                          className={`relative ${key === "premium" ? "border-primary shadow-lg" : ""}`}
                        >
                          {key === "premium" && (
                            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                              Most Popular
                            </Badge>
                          )}
                          <CardHeader className="text-center">
                            <CardTitle className="text-xl">
                              {pkg.name}
                            </CardTitle>
                            <div className="text-primary text-3xl font-bold">
                              {typeof pkg.price === "number"
                                ? `GHC${pkg.price}`
                                : pkg.price}
                            </div>
                            <p className="text-muted-foreground">{pkg.unit}</p>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              {pkg.features.map((feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span className="text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                            <Button
                              className="w-full"
                              variant={
                                key === "premium" ? "default" : "outline"
                              }
                              asChild
                            >
                              <Link href="/contacts">Get Started</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Process */}
                  <div className="space-y-8">
                    <div className="text-center">
                      <h4 className="mb-2 text-2xl font-bold">Our Process</h4>
                      <p className="text-muted-foreground">
                        How we deliver exceptional results
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-5">
                      {service.process.map((step, index) => (
                        <div key={index} className="text-center">
                          <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                            {index + 1}
                          </div>
                          <p className="text-sm font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-20 md:px-10">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Choose AgriGrow?</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              We're committed to your success with proven expertise and
              comprehensive support.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <Card className="p-6 text-center">
              <Award className="text-primary mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 font-semibold">10+ Years Experience</h3>
              <p className="text-muted-foreground text-sm">
                Proven track record in agricultural excellence
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Users className="text-primary mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 font-semibold">500+ Happy Farmers</h3>
              <p className="text-muted-foreground text-sm">
                Trusted by farmers across Ghana
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="text-primary mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 font-semibold">Quality Guarantee</h3>
              <p className="text-muted-foreground text-sm">
                100% satisfaction guarantee on all services
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Clock className="text-primary mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 font-semibold">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">
                Round-the-clock assistance when you need it
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 px-4 py-20 md:px-10">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">What Our Clients Say</h2>
            <p className="text-muted-foreground">
              Real feedback from farmers who've experienced our services
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "{testimonial.content}"
                </p>
                <div className="relative z-10 flex items-center justify-start pl-15">
                  <div className="absolute -left-0 z-20 h-12 w-12">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {testimonial.service}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground px-4 py-20 md:px-10">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Transform Your Farm?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            Get started with our comprehensive agricultural services today.
            Contact us for a free consultation.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contacts">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Link>
            </Button>
            <Button
              size="lg"
              className="hover:text-primary border border-white bg-transparent px-8 py-5 text-lg text-white hover:bg-white"
              asChild
            >
              <Link href="/contacts">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
