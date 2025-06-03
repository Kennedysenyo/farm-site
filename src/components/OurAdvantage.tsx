import {
  ArrowRight,
  Brain,
  Clock,
  Handshake,
  Leaf,
  LucideIcon,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
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

export const OurAdvantage = () => {
  const iconMap: Record<string, LucideIcon> = {
    brain: Brain,
    leaf: Leaf,
    handsShake: Handshake,
    clock: Clock,
  };

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
  return (
    <section className="from-muted/30 to-background bg-gradient-to-b py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">
            Our Advantage
          </Badge>
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">Why Choose Us</h2>
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
  );
};
