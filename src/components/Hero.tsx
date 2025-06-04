import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, CheckCircle, Clock, Shield } from "lucide-react";
import { Badge } from "./ui/badge";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative flex min-h-[100vh] items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/home/hero.png"
          alt="Farm landscape"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10 container mx-auto flex flex-col items-center px-6">
        <div className="flex max-w-4xl flex-col items-center">
          <Badge
            variant="secondary"
            className="mb-6 border-white/30 bg-white/20 text-sm text-white"
          >
            🌱 Trusted by 500+ Farmers
          </Badge>

          <h1 className="mb-6 px-4 text-center text-4xl leading-tight font-bold text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
            Growing the Future,
            <br />
            <span className="text-primary">One Seedling at a Time</span>
          </h1>

          <p className="mb-8 max-w-2xl text-center text-xl leading-relaxed text-white/90 drop-shadow-lg">
            Quality seedlings, expert consultancy, and farmland solutions to
            help you build a thriving agricultural business.
          </p>

          <div className="mb-8 flex w-full flex-col justify-center gap-4 px-4 sm:flex-row">
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link href="/farm-lands">
                Acquire Farmland <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="hover:text-primary border border-white bg-transparent px-8 py-5.5 text-lg text-white hover:bg-white"
            >
              <Link href="/products">Order Seedlings</Link>
            </Button>
          </div>

          <div className="flex justify-center md:gap-6 lg:justify-between">
            <div className="flex items-center gap-2 text-white/80 md:gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>100% Organic</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span>Fast Delivery</span>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="hidden lg:block">
              <div className="rounded-2xl bg-white/10 p-6 text-white backdrop-blur-md">
                <div className="grid grid-cols-3 gap-6 text-center">
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
          </div>
        </div>
      </div>
    </section>
  );
};
