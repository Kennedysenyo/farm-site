import { Quote, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
const testimonials = [
  {
    name: "John Mensah",
    role: "Cocoa Farmer",
    location: "Ashanti Region",
    content:
      "The seedlings I got from StartAgri have exceeded my expectations. 98% survival rate and excellent growth. My farm has never looked better!",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Mary Asante",
    role: "Agricultural Entrepreneur",
    location: "Eastern Region",
    content:
      "Their consultation services helped me increase my yield by 40%. The team is knowledgeable and always available when I need support.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Samuel Osei",
    role: "Farm Manager",
    location: "Central Region",
    content:
      "StartAgri helped me secure the perfect farmland and provided ongoing support. Their expertise in land development is unmatched.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
];
export const TestimonialsSection = () => {
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

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-8">
                <Quote className="text-primary/20 mb-4 h-8 w-8" />
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {testimonial.role} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
