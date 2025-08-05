"use client"
import Image from "next/image";
import "../globals.css";

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import messages from "@/messages.json";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  return (
    <>
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold">Dive into the world of Anonymous Converstions</h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">Explore Mystery Message - Where your identity remains a secret.</p>
      </section>
      <Carousel  plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}className="w-full max-w-xs">
        <CarouselContent>
          {
            messages.map((message , index) =>(
              <CarouselItem key = {index}>
                <div>

                  <Card>
                    <CardHeader className="font-semibold items-center justify-center">
                      {message.title}
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-lg font-semibold">
                        {message.content}
                      </span>

                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </main>
    <footer className="text-center p-4 md:p-6">
        &copy;2023 Mystery Message.All rights reserved.
    </footer>
    </>
  );
}
