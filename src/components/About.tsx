import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Award } from "lucide-react";
import { Badge } from "./ui/badge";

export const AboutSection = () => {
  return (
    <section className="from-background to-muted/30 bg-gradient-to-b py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="from-primary/20 absolute -inset-4 rounded-2xl bg-gradient-to-r to-transparent blur-xl" />
            <Image
              src="/img/cocoa-nursery.jpg"
              alt="cocoa-nursery"
              width={600}
              height={500}
              className="relative w-full rounded-2xl object-cover shadow-2xl"
            />
            <div className="absolute top-4 left-4 rounded-lg bg-white/90 p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Award className="text-primary h-5 w-5" />
                <span className="text-sm font-semibold text-black">
                  Certified Organic
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-4">
                About Us
              </Badge>
              <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
                Who We Are
              </h2>
            </div>

            <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
              <p>
                We are dedicated to providing top-quality seedlings, expert
                farming consultancy, and farmland solutions to help you succeed
                in agriculture.
              </p>
              <p>
                Whether you're looking to start a farm, secure farmland, or
                improve your yield, we've got you covered with over a decade of
                experience in sustainable agriculture.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-background rounded-lg border p-4 text-center">
                <div className="text-primary mb-2 text-3xl font-bold">10+</div>
                <div className="text-muted-foreground text-sm">
                  Years Experience
                </div>
              </div>
              <div className="bg-background rounded-lg border p-4 text-center">
                <div className="text-primary mb-2 text-3xl font-bold">500+</div>
                <div className="text-muted-foreground text-sm">
                  Successful Projects
                </div>
              </div>
            </div>

            <Button size="lg" asChild>
              <Link href="/about">
                Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
