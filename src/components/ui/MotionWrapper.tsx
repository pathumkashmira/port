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
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.75, ease: smoothEase },
            },
          }}
          className="inline-block"
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
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay, ease: smoothEase }}
      className={className}
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: smoothEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
