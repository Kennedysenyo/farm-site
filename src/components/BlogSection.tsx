import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
const blogPosts = [
  {
    title: "5 Essential Tips for Successful Cocoa Farming",
    excerpt:
      "Learn the key strategies that can help you maximize your cocoa yield and improve farm profitability.",
    date: "Dec 15, 2024",
    image: "/placeholder.svg?height=200&width=300",
    category: "Farming Tips",
  },
  {
    title: "Sustainable Agriculture: The Future of Farming",
    excerpt:
      "Discover how sustainable farming practices can benefit both your farm and the environment.",
    date: "Dec 10, 2024",
    image: "/placeholder.svg?height=200&width=300",
    category: "Sustainability",
  },
  {
    title: "Market Trends: What to Plant This Season",
    excerpt:
      "Stay ahead with insights on the most profitable crops and market demands for the upcoming season.",
    date: "Dec 5, 2024",
    image: "/placeholder.svg?height=200&width=300",
    category: "Market Insights",
  },
];

export const BlogSection = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">
            Latest Insights
          </Badge>
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">From Our Blog</h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            Stay updated with the latest farming tips, market insights, and
            agricultural innovations.
          </p>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="from-muted/30 to-background group bg-gradient-to-r transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="bg-primary/90 absolute top-3 left-3">
                  {post.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-lg font-semibold transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 text-sm">
                  {post.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/blog">
              Read More Articles <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
