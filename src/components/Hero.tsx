import Link from "next/link";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section
      className="relative flex min-h-[700px] items-center bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/img/hero.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"></div>

      <div className="relative container mx-auto px-6 text-center">
        <h1 className="mb-4 text-4xl font-bold drop-shadow-lg md:text-6xl lg:text-7xl">
          Growing the Future, One Seedling at a Time
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-lg drop-shadow-lg md:text-xl">
          Quality Seedlings, expert consultancy, and farmland solutions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/products">Order Now</Link>
          </Button>
          <Button
            size="lg"
            asChild
            className="hover:text-primary border border-white bg-transparent text-white hover:bg-white"
          >
            <Link href="#contacts">Get Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
