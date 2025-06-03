import { ArrowRight, Mail, MapPinIcon, Phone } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

export const ContactSection = () => {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="bg-background rounded-2xl border p-12 shadow-lg">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-4">
                Get In Touch
              </Badge>
              <h2 className="mb-6 text-4xl font-bold">
                Ready to Start Your Agricultural Journey?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Whether you need seedlings, consultation, or farmland solutions,
                we're here to help you succeed. Contact us today for a free
                consultation.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-primary h-5 w-5" />
                  <span>+233 123 456 789</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-primary h-5 w-5" />
                  <span>info@startagri.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPinIcon className="text-primary h-5 w-5" />
                  <span>Somanya, E/R, Ghana</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button size="lg" asChild className="w-full">
                <Link href="/contacts">
                  Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full">
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full">
                <Link href="/farm-lands">View Farmlands</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
