import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  Sprout,
  BookOpenCheck,
  MapPin,
  Tractor,
  type LucideIcon,
  Brain,
  Leaf,
  Handshake,
  Clock,
  ArrowRight,
  Users,
  Target,
} from "lucide-react";

const QUALITIES = [
  {
    icon: "brain",
    title: "Expert Knowledge",
    desc: "Years of agricultural expertise and proven farming techniques",
  },
  {
    icon: "leaf",
    title: "Sustainable Practices",
    desc: "Environmentally conscious farming methods for long-term success",
  },
  {
    icon: "handsShake",
    title: "Trusted Partnership",
    desc: "Building lasting relationships with farmers and communities",
  },
  {
    icon: "clock",
    title: "Timely Support",
    desc: "Round-the-clock assistance when you need it most",
  },
];

const SERVICES = [
  {
    icon: "sprout",
    title: "Premium Seedlings",
    desc: "High-quality, disease-resistant seedlings for optimal growth",
  },
  {
    icon: "bookOpenCheck",
    title: "Expert Consultation",
    desc: "Professional guidance from experienced agricultural specialists",
  },
  {
    icon: "mapPin",
    title: "Farmland Solutions",
    desc: "Comprehensive land acquisition and development services",
  },
  {
    icon: "tractor",
    title: "Equipment Support",
    desc: "Access to modern farming equipment and maintenance services",
  },
];

const iconMap: Record<string, LucideIcon> = {
  sprout: Sprout,
  bookOpenCheck: BookOpenCheck,
  mapPin: MapPin,
  tractor: Tractor,
  brain: Brain,
  leaf: Leaf,
  handsShake: Handshake,
  clock: Clock,
};

export default function AboutPage() {
  const ourQualities = QUALITIES.map((quality, index) => {
    const Icon = iconMap[quality.icon];
    return (
      <Card
        key={index}
        className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <CardContent className="p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-primary/10 group-hover:bg-primary/20 rounded-full p-4 transition-colors">
              <Icon className="text-primary h-8 w-8" />
            </div>
          </div>
          <h3 className="mb-3 text-xl font-semibold">{quality.title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {quality.desc}
          </p>
        </CardContent>
      </Card>
    );
  });

  const ourServices = SERVICES.map((service, index) => {
    const Icon = iconMap[service.icon];
    return (
      <Card
        key={index}
        className="group from-background to-muted/30 bg-gradient-to-br transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="bg-primary/10 group-hover:bg-primary/20 w-fit rounded-lg p-3 transition-colors">
              <Icon className="text-primary h-8 w-8" />
            </div>
          </div>
          <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {service.desc}
          </p>
          <div className="text-primary flex items-center text-sm font-medium transition-transform group-hover:translate-x-1">
            Learn more <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    );
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/cashew.jpg"
            alt="Farm Vision"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Badge
            variant="secondary"
            className="mb-6 border-white/30 bg-white/20 text-white"
          >
            Our Mission
          </Badge>
          <h1 className="mb-8 text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
            Empowering Farmers,
            <br />
            <span className="text-primary">Growing Together</span>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed opacity-90 md:text-2xl">
            Quality seedlings, expert guidance, and sustainable farmland
            solutions — rooted in purpose, growing with integrity.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="px-8 py-6 text-lg">
              <Link href="/contacts">
                Get In Touch <ArrowRight className="ml-2 h-5 w-5" />
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
        </div>
      </section>

      {/* Our Story Section */}
      <section className="from-background to-muted/30 bg-gradient-to-b py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="from-primary/20 absolute -inset-4 rounded-2xl bg-gradient-to-r to-transparent blur-xl" />
              <Image
                src="/img/about/story.jpg"
                alt="Cocoa Seedling Farmer"
                width={600}
                height={500}
                className="relative w-full rounded-2xl object-cover shadow-2xl"
              />
            </div>

            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">
                  Our Journey
                </Badge>
                <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
                  Our Story
                </h2>
              </div>
              <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
                <p>
                  From a humble beginning rooted in passion for agriculture, our
                  journey began with a simple goal — to make farming accessible,
                  sustainable, and profitable for everyone.
                </p>
                <p>
                  Over the years, we've grown into a trusted partner for
                  farmers, landowners, and agriculture enthusiasts across the
                  country. With every seedling we nurture and every farmland we
                  help secure, our story continues.
                </p>
                <p className="text-foreground font-medium">
                  Driven by our commitment to excellence, community, and
                  innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4">
              What We Offer
            </Badge>
            <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
              Our Services
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
              From premium seedlings to expert consultancy and farmland
              solutions — we offer everything you need to thrive in agriculture.
            </p>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {ourServices}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/services">
                See All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="from-muted/30 to-background bg-gradient-to-b py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4">
              Our Advantage
            </Badge>
            <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
              We're more than just a farm — we're your partner in growth. Here's
              why farmers and landowners across the country trust us.
            </p>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {ourQualities}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/products">
                Order Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4">
                  Our People
                </Badge>
                <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
                  Meet the Team Behind the Vision
                </h2>
              </div>
              <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
                <p>
                  Our team is a passionate blend of experienced farmers,
                  agronomists, and consultants dedicated to helping you grow.
                </p>
                <p>
                  With years of hands-on knowledge and a deep understanding of
                  sustainable agriculture, we're here to guide, support, and
                  grow with you—every step of the way.
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/contacts">
                  Partner With Us <Users className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="from-primary/20 absolute -inset-4 rounded-2xl bg-gradient-to-l to-transparent blur-xl" />
              <Image
                src="/img/team.jpg"
                alt="Our team"
                width={600}
                height={500}
                className="relative w-full rounded-2xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="from-muted/30 to-background bg-gradient-to-b py-20">
        <div className="container mx-auto px-4">
          <Card className="border-2 shadow-2xl">
            <CardContent className="p-12">
              <div className="mb-12 text-center">
                <Badge variant="outline" className="mb-4">
                  Our Impact
                </Badge>
                <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
                  Making a Difference
                </h2>
                <p className="text-muted-foreground mx-auto max-w-4xl text-lg leading-relaxed">
                  Over the years, our work has positively impacted countless
                  farmers, families, and communities across the country. From
                  helping smallholder farmers gain access to quality seedlings,
                  to transforming underutilized lands into thriving farms.
                </p>
              </div>

              <div className="mb-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
                <div className="text-center">
                  <div className="text-primary mb-2 text-5xl font-bold">
                    500+
                  </div>
                  <div className="text-muted-foreground font-medium">
                    Farms Supported
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-primary mb-2 text-5xl font-bold">
                    100K+
                  </div>
                  <div className="text-muted-foreground font-medium">
                    Seedlings Distributed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-primary mb-2 text-5xl font-bold">
                    100+
                  </div>
                  <div className="text-muted-foreground font-medium">
                    Land Deals Secured
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-primary mb-2 text-5xl font-bold">
                    95%
                  </div>
                  <div className="text-muted-foreground font-medium">
                    Satisfaction Rate
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" asChild>
                  <Link href="/contacts">
                    Join the Movement <Target className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl space-y-8">
            <Badge
              variant="secondary"
              className="mb-4 border-white/30 bg-white/20 text-white"
            >
              Join Us Today
            </Badge>
            <h2 className="text-4xl leading-tight font-bold lg:text-6xl">
              Rooted in Purpose.
              <br />
              Growing with You.
            </h2>
            <p className="text-xl leading-relaxed opacity-90 lg:text-2xl">
              At the heart of our journey is a commitment to empower farmers,
              protect the land, and feed the future. Whether you're just
              starting out or scaling your operations, we're here to walk with
              you — every step of the way.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/services">
                  Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                className="hover:text-primary border border-white bg-transparent px-8 py-5 text-lg text-white hover:bg-white"
              >
                <Link href="/contacts">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
