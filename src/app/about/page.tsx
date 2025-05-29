import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Sprout,
  BookOpenCheck,
  MapPin,
  Tractor,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  sprout: Sprout,
  bookOpenCheck: BookOpenCheck,
  mapPin: MapPin,
  tractor: Tractor,
};

const SERVICES = [
  {
    title: "Seedling Supply",
    desc: "High-quality seedlings nurtured for mango, coconut, pawpaw, and more.",
    icon: "sprout",
  },
  {
    title: "Farming Consultancy",
    desc: "Expert advice and strategies for small- and large-scale farmers.",
    icon: "bookOpenCheck",
  },
  {
    title: "Farmland Acquisition",
    desc: "Helping you secure productive farmland across various regions.",
    icon: "mapPin",
  },
  {
    title: "Farm Setup & Management",
    desc: "From setup to harvest, we guide you in building a successful farm.",
    icon: "tractor",
  },
];
export default function AboutPage() {
  const ourServices = SERVICES.map((service, index) => {
    const Icon = iconMap[service.icon];

    return (
      <div
        key={index}
        className="border-border bg-muted mx-auto flex max-w-xs flex-col gap-4 rounded-md border p-6 shadow-sm transition hover:shadow-md"
      >
        <Icon className="text-primary h-10 w-10" />
        <h3 className="text-lg font-semibold">{service.title}</h3>
        <p className="text-muted-foreground text-sm">{service.desc}</p>
      </div>
    );
  });

  return (
    <>
      <section className="xs:px-3 flex w-full flex-col items-center px-2 py-16 sm:px-4 md:p-10">
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

      <section className="bg-muted text-muted-foreground w-full px-4 py-16 md:px-10">
        <div className="container mx-auto flex flex-col items-center gap-8 md:flex-row md:gap-10">
          <div className="flex justify-center md:w-1/2">
            <Image
              src="/img/about-story.jpg"
              alt="Cocoa Seedling Farmer"
              width={500}
              height={400}
              className="rounded-md object-cover shadow-md"
            />
          </div>

          <div className="space-y-6 md:w-1/2">
            <h2 className="text-center text-3xl font-bold sm:text-4xl md:text-left md:text-5xl">
              Our Story
            </h2>
            <p className="text-sm leading-relaxed sm:text-base md:text-lg">
              From a humble beginning rooted in passion for agriculture, our
              journey began with a simple goal — to make farming accessible,
              sustainable, and profitable for everyone. Over the years, we’ve
              grown into a trusted partner for farmers, landowners, and
              agriculture enthusiasts across the country.
              <br />
              <br />
              With every seedling we nurture and every farmland we help secure,
              our story continues — driven by our commitment to excellence,
              community, and innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background text-foreground w-full px-4 py-16 md:px-10">
        <div className="container mx-auto space-y-10 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Our Services
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg">
              From premium seedlings to expert consultancy and farmland
              solutions — we offer everything you need to thrive in agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ourServices}
          </div>

          <div>
            <Button asChild>
              <Link href="/services">See All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
