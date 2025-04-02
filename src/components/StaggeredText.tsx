import React from 'react';
import { motion } from 'framer-motion';

interface StaggeredTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export function StaggeredText({ text, as: Component = 'div', className = '' }: StaggeredTextProps) {
  const words = text.split(' ');

  return (
    <Component className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: i * 0.1
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}