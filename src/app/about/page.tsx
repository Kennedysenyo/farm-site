import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="xs:px-3 flex w-full flex-col items-center px-2 py-10 sm:px-4 md:p-10">
        <div className="border-border container rounded-md border shadow-lg">
          <div className="relative">
            <Image
              src="/img/cashew.jpg"
              alt="Farm Vision"
              width={800}
              height={600}
              priority
              className="w-full rounded-md object-cover"
            />
            <div className="absolute inset-0 z-10 rounded-md bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            <div className="absolute inset-0 z-20 flex w-full flex-col items-center justify-center gap-2 rounded-md px-4 py-6 sm:py-8 md:gap-4 md:px-6">
              <h1 className="text-center text-2xl font-bold text-white drop-shadow-lg sm:text-3xl md:text-5xl">
                Our Mission
              </h1>
              <p className="rounded-md border-2 border-white bg-white/40 p-2 text-xs text-white sm:max-w-md sm:text-sm md:p-4 md:text-2xl">
                Empowering farmers with quality seedlings, expert guidance, and
                sustainable farmland solutions — rooted in purpose, growing with
                integrity.
              </p>
              <div className="md grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-4">
                <Button size="sm" asChild>
                  <Link href="/#contacts">Get In Touch</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="hover:text-primary border border-white bg-transparent text-white hover:bg-white"
                >
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-muted flex w-full flex-col p-4 md:p-10"></section>
    </>
  );
}
