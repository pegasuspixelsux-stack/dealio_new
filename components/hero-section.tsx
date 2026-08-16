"use client";

import { motion } from "motion/react";
import { ArrowRight, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

const HEADLINE = "Close better deals, faster than ever";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border/60 pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[-10rem] h-[32rem] w-[64rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.15] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
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
          className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl"
        >
          Dealio turns rough pipeline notes into structured, ready-to-send
          briefs in seconds — so your team spends less time organizing and
          more time closing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
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
    </section>
  );
}
