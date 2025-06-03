"use client";

import Link from "next/link";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Calendar,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        service: "",
        message: "",
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our agricultural experts",
      contact: "+233 123 456 789",
      action: "Call Now",
      available: "Mon-Fri 8AM-6PM",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us your questions and we'll respond within 24 hours",
      contact: "info@startagri.com",
      action: "Send Email",
      available: "24/7 Response",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Quick support via WhatsApp messaging",
      contact: "+233 123 456 789",
      action: "Chat Now",
      available: "Mon-Sat 8AM-8PM",
    },
    {
      icon: Calendar,
      title: "Schedule Visit",
      description: "Book a consultation or farm visit",
      contact: "Book Online",
      action: "Schedule Now",
      available: "Flexible Timing",
    },
  ];

  const officeLocations = [
    {
      city: "Somanya",
      address: "456 Djaba Road, Somanya, Ghana",
      phone: "+233 987 654 321",
      email: "somnanya@startagri.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    },
    {
      city: "Accra",
      address: "123 Liberation Road, Accra, Ghana",
      phone: "+233 123 456 789",
      email: "accra@startagri.com",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    },
  ];

  const faqs = [
    {
      question: "What types of seedlings do you offer?",
      answer:
        "We offer a wide variety of high-quality seedlings including cocoa, coffee, citrus, vegetables, and other cash crops. All our seedlings are disease-resistant and have a 95% survival rate guarantee.",
    },
    {
      question: "Do you provide farmland consultation services?",
      answer:
        "Yes, we offer comprehensive farmland consultation including soil analysis, crop selection guidance, farming best practices, and ongoing support to help you maximize your agricultural success.",
    },
    {
      question: "How do I schedule a farm visit?",
      answer:
        "You can schedule a farm visit by calling us, filling out our contact form, or using our online booking system. We offer flexible scheduling to accommodate your needs.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve all regions of Ghana with our main offices in Accra and Kumasi. We provide delivery services and can arrange consultations nationwide.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="from-primary/10 to-primary/5 bg-gradient-to-r px-4 py-16 md:px-10">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            Contact Us
          </Badge>
          <h1 className="from-primary to-primary/70 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Let's Grow Together
          </h1>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            Ready to start your agricultural journey? Get in touch with our
            experts for personalized guidance and support.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 py-20 md:px-10">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Get In Touch</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Choose the most convenient way to reach us. Our team is ready to
              help you succeed.
            </p>
          </div>

          <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card
                  key={index}
                  className="text-center transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                      <Icon className="text-primary h-8 w-8" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">
                      {method.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {method.description}
                    </p>
                    <div className="space-y-2">
                      <p className="font-medium">{method.contact}</p>
                      <p className="text-muted-foreground text-xs">
                        {method.available}
                      </p>
                    </div>
                    <Button className="mt-4 w-full" size="sm">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-muted/30 px-4 py-20 md:px-10">
        <div className="container mx-auto">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="py-8 text-center">
                    <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
                    <h3 className="mb-2 text-xl font-semibold">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for contacting us. We'll get back to you within
                      24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Full Name *
                        </label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Phone Number
                        </label>
                        <Input
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="+233 123 456 789"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Service Interest
                        </label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            handleInputChange("service", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="seedlings">
                              Premium Seedlings
                            </SelectItem>
                            <SelectItem value="consultation">
                              Expert Consultation
                            </SelectItem>
                            <SelectItem value="farmland">
                              Farmland Solutions
                            </SelectItem>
                            <SelectItem value="equipment">
                              Equipment Support
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Subject *
                      </label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        placeholder="Brief subject of your inquiry"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Message *
                      </label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        placeholder="Tell us more about your needs and how we can help you..."
                        rows={5}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Locations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Our Offices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {officeLocations.map((office, index) => (
                    <div
                      key={index}
                      className="border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <h3 className="mb-2 text-lg font-semibold">
                        {office.city} Office
                      </h3>
                      <div className="text-muted-foreground space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                          <span>{office.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <span>{office.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span>{office.hours}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Stay connected for the latest updates and farming tips
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Facebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Instagram className="mr-2 h-4 w-4" />
                      Instagram
                    </Button>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-primary text-2xl font-bold">
                        500+
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Happy Farmers
                      </div>
                    </div>
                    <div>
                      <div className="text-primary text-2xl font-bold">10+</div>
                      <div className="text-muted-foreground text-sm">
                        Years Experience
                      </div>
                    </div>
                    <div>
                      <div className="text-primary text-2xl font-bold">95%</div>
                      <div className="text-muted-foreground text-sm">
                        Success Rate
                      </div>
                    </div>
                    <div>
                      <div className="text-primary text-2xl font-bold">
                        24/7
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Support
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20 md:px-10">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Find answers to common questions about our services and how we can
              help your agricultural business.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-lg font-semibold">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Button asChild>
              <Link href="#contact-form">Contact Us Directly</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="bg-primary text-primary-foreground px-4 py-16 md:px-10">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-2xl font-bold">
            Need Immediate Assistance?
          </h2>
          <p className="mb-6 text-lg opacity-90">
            For urgent agricultural emergencies or time-sensitive consultations
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary">
              <Phone className="mr-2 h-5 w-5" />
              Emergency Hotline: +233 911 000 000
            </Button>
            <Button
              size="lg"
              className="hover:text-primary border border-white bg-transparent px-8 py-5 text-lg text-white hover:bg-white"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              WhatsApp Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
