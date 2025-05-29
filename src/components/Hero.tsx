import Link from "next/link";

export const Hero = () => {
  return (
    <section
      className="relative flex min-h-screen items-center bg-cover bg-center text-white"
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
          <Link
            href="/products"
            className="bg-primary hover:bg-primary/90 animate-fade-in duration-all rounded-lg px-6 py-3 font-semibold text-white transition-colors"
          >
            {" "}
            Order Now
          </Link>
          <Link
            href="#contacts"
            className="bg-opacity-20 hover:text-primary duration-all animate-fade-in rounded-lg border-2 border-white px-6 py-3 font-semibold transition-colors hover:bg-white"
          >
            Get Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};
