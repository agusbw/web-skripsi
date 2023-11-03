import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="text-gray-600">
      <div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
        <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
          <h1 className="mb-4 text-3xl font-semibold text-gray-900 sm:text-4xl">
            Before they sold out
            <br className="hidden lg:inline-block" />
            readymade gluten
          </h1>
          <p className="mb-8 leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/login">Ajukan Keluhan</Link>
            </Button>
            <Button
              asChild
              variant={"secondary"}
            >
              <Link href="#">Lebih Lanjut</Link>
            </Button>
          </div>
        </div>
        <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600"
            width={720}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}
