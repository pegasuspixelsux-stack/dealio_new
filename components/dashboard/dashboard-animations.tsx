"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface DashboardAnimationsProps {
  children: ReactNode;
}

export function DashboardAnimations({ children }: DashboardAnimationsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="contents"
    >
      {Array.isArray(children)
        ? children.map((child, idx) => (
            <motion.div key={idx} variants={item}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
