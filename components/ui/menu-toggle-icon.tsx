"use client";

import { motion } from "framer-motion";

interface MenuToggleIconProps {
  isOpen: boolean;
}

export function MenuToggleIcon({ isOpen }: MenuToggleIconProps) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        className="block h-0.5 w-full bg-current rounded-full origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-0.5 w-full bg-current rounded-full"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        className="block h-0.5 w-full bg-current rounded-full origin-center"
      />
    </div>
  );
}
