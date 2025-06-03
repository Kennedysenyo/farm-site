import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const NewsletterSection = () => {
  return (
    <section className="from-primary to-primary/80 text-primary-foreground bg-gradient-to-r py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
            Stay Connected
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            Get the latest farming tips, product updates, and exclusive offers
            delivered straight to your inbox.
          </p>

          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-white/30 bg-white/20 py-5 text-white placeholder:text-white/70"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>

          <p className="mt-4 text-sm opacity-70">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
