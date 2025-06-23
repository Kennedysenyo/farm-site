"use client";

import { AboutSection } from "@/components/About";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { NewsletterSection } from "@/components/NewsLetterSection";

import { ProcessSection } from "@/components/ProcessSection";
import { ProductsSection } from "@/components/Products";
import { ServicesSection } from "@/components/Services";
import { TestimonialsSection } from "@/components/Testimonials";
import { useShowSocialLoginToast } from "@/hooks/useShowSocialLoginToast";

export default function Home() {
  useShowSocialLoginToast();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Hero />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <TestimonialsSection />
      {/* <OurAdvantage /> */}
      <ProcessSection />
      <BlogSection />
      <NewsletterSection />
      <ContactSection />
    </div>
  );
}
