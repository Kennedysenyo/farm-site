import {
  ArrowRight,
  BookOpenCheck,
  LucideIcon,
  MapPin,
  Sprout,
  Tractor,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const SERVICES = [
  {
    icon: "sprout",
    title: "Premium Seedlings",
    desc: "High-quality, disease-resistant seedlings for optimal growth",
    link: "seedlings",
  },
  {
    icon: "bookOpenCheck",
    title: "Expert Consultation",
    desc: "Professional guidance from experienced agricultural specialists",
    link: "consultation",
  },
  {
    icon: "mapPin",
    title: "Farmland Solutions",
    desc: "Comprehensive land acquisition and development services",
    link: "farm-land",
  },
  {
    icon: "tractor",
    title: "Equipment Support",
    desc: "Access to modern farming equipment and maintenance services",
    link: "equipment",
  },
];

export const ServicesSection = () => {
  const iconMap: Record<string, LucideIcon> = {
    sprout: Sprout,
    bookOpenCheck: BookOpenCheck,
    mapPin: MapPin,
    tractor: Tractor,
  };

  const ourServices = SERVICES.map((service, index) => {
    const Icon = iconMap[service.icon];
    return (
      <Card key={index} className="group hover:-translate-y-1 hover:shadow-xl">
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
          <Link
            className="text-primary flex items-center text-sm font-medium transition-transform group-hover:translate-x-1"
            href={`/services#${service.link}`}
          >
            Learn more <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    );
  });

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">
            What We Offer
          </Badge>
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">Our Services</h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
            From premium seedlings to expert consultancy and farmland solutions
            — we offer everything you need to thrive in agriculture.
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
  );
};
