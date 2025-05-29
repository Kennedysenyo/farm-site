import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export const About = () => {
  return (
    <section className="bg-background text-foreground flex flex-col gap-4 py-16">
      <h2 className="mb-6 text-center text-3xl font-bold md:text-5xl">
        Who We Are
      </h2>
      <div className="container mx-auto flex flex-col items-center gap-10 px-6 md:flex-row md:items-center">
        <div className="md:w-1/2">
          <Image
            src="/img/cocoa-nursery.jpg"
            alt="cocoa-nursery"
            width={600}
            height={500}
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div className="text-center md:w-1/2 md:text-left">
          <p className="mb-6 text-lg leading-relaxed">
            We are dedicated to providing top-quality seedlings, expert farming
            consultancy, and farmland solutions to help you succeed in
            agriculture. <br />
            Whether you're looking to start a farm, secure farmland, or improve
            your yield, we've got you covered.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <Button asChild>
          <Link href="/about">Learn More</Link>
        </Button>
      </div>
    </section>
  );
};
