import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export const About = () => {
  return (
    <>
      <section className="text-foreground w-full px-4 py-16 md:px-10">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl md:text-left md:text-5xl">
            Who We Are
          </h2>
          <div className="container mx-auto flex flex-col items-center gap-8 md:flex-row md:gap-10">
            <div className="flex justify-center md:w-1/2">
              <Image
                src="/img/cocoa-nursery.jpg"
                alt="cocoa-nursery"
                width={600}
                height={500}
                className="rounded-2xl shadow-lg"
              />
            </div>

            <div className="space-y-6 md:w-1/2">
              <p className="text-lg leading-relaxed md:text-2xl">
                We are dedicated to providing top-quality seedlings, expert
                farming consultancy, and farmland solutions to help you succeed
                in agriculture. <br />
                Whether you're looking to start a farm, secure farmland, or
                improve your yield, we've got you covered.
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>
    </>
  );
};
