"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#CCD5AE] via-[#D4A373] to-[#A06733] origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
}
