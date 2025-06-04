import { Quote, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { testimonials } from "@/utils/data";

export const TestimonialsSection = () => {
  const testimonialElements = testimonials.map((testimonial, index) => (
    <Card key={index} className="relative">
      <CardContent className="p-8">
        <Quote className="text-primary/20 mb-4 h-8 w-8" />
        <p className="text-muted-foreground mb-6 leading-relaxed">
          "{testimonial.content}"
        </p>
        <div className="mb-4 flex items-center gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <div className="relative z-10 flex items-center justify-center pl-15">
          <div className="absolute -left-0 z-20 h-12 w-12">
            <Image
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold">{testimonial.name}</div>
            <div className="text-muted-foreground text-sm">
              {testimonial.role} • {testimonial.location}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
            What Our Farmers Say
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            Don't just take our word for it. Here's what our satisfied customers
            have to say about their experience with us.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">{testimonialElements}</div>
      </div>
    </section>
  );
};
