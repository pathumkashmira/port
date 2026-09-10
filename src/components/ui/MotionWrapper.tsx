'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const smoothEase = [0.16, 1, 0.3, 1] as const;

export function AnimatedHeading({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.04, delayChildren: delay }}
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: smoothEase },
            },
          }}
          className="inline-block will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function FadeInUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: smoothEase }}
      className={`${className} will-change-transform`}
    >
      {children}
    </motion.div>
  );
}

export function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay, ease: smoothEase }}
      className={`${className} will-change-transform`}
    >
      {children}
    </motion.div>
  );
}
