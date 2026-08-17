"use client";

import { motion } from "motion/react";
import { ArrowRight, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

const HEADLINE = "Close better deals, faster than ever";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border/60 py-20 sm:py-28"
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.1] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="flex flex-col items-start text-left">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            Now with AI-generated deal briefs
          </motion.span>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {HEADLINE.split(" ").map((word, index) => (
              <motion.span
                key={word + index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08, ease: "easeInOut" }}
                className="mr-[0.3ch] inline-block last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mt-6 max-w-lg text-balance text-lg text-muted-foreground sm:text-xl"
          >
            Dealio turns rough pipeline notes into structured, ready-to-send
            briefs in seconds — so your team spends less time organizing and
            more time closing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="mt-10 flex flex-col items-start gap-3 sm:flex-row"
          >
            <Button size="lg" className="w-full sm:w-auto">
              Get started for free
              <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <PlayCircle />
              Watch demo
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-cars.png"
            alt="A lineup of vehicles available on the lot"
            className="w-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
