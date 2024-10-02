'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function AboutPageContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="bg-background dark:bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
