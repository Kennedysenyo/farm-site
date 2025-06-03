import { BookOpenCheck, MapPin, Sprout, TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";

export const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description:
        "We assess your needs and provide expert recommendations tailored to your farming goals.",
      icon: BookOpenCheck,
    },
    {
      number: "02",
      title: "Planning",
      description:
        "Together, we create a comprehensive plan for your agricultural project and timeline.",
      icon: MapPin,
    },
    {
      number: "03",
      title: "Implementation",
      description:
        "We provide quality seedlings, equipment, and ongoing support throughout the process.",
      icon: Sprout,
    },
    {
      number: "04",
      title: "Success",
      description:
        "Watch your farm thrive with our continued guidance and premium agricultural solutions.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge
            variant="secondary"
            className="mb-4 border-white/30 bg-white/20 text-white"
          >
            Our Process
          </Badge>
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">How We Work</h2>
          <p className="mx-auto max-w-3xl text-xl opacity-90">
            From initial consultation to harvest success, we guide you through
            every step of your agricultural journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="text-primary absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="leading-relaxed opacity-90">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
