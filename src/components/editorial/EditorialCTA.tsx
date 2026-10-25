"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function EditorialCTA() {
  return (
    <section className="py-20 sm:py-28 border-t border-[#CCD5AE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#041214] border border-[#CCD5AE]/30 rounded-3xl p-10 sm:p-16 lg:p-20 text-center space-y-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle floating ambient gold and sage glow inside the dark container */}
          <motion.div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#D4A373]/25 blur-3xl pointer-events-none"
            animate={{
              x: [0, -30, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#CCD5AE]/20 blur-3xl pointer-events-none"
            animate={{
              x: [0, 30, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="max-w-3xl mx-auto space-y-5 relative z-10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FDBB4F] px-4 py-1.5 rounded-full bg-[#FEFAE0]/10 border border-[#FDBB4F]/30 font-bold inline-block">
              COMMISSIONS & ENQUIRIES
            </span>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-normal text-[#FEFAE0] leading-[1.05]">
              Have an Idea? <br />
              <span className="text-[#D4A373] italic">Let&apos;s Build It.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#E9EDC9]/90 leading-relaxed max-w-xl mx-auto font-sans">
              Tell us what you want to create. Website packages start from ₹5,000 with transparent deliverables, clean architecture, and reliable timelines.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  href="/get-a-quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-archia font-semibold tracking-wide text-[#041214] bg-[#D4A373] hover:bg-[#FDBB4F] shadow-lg active:scale-[0.98] transition-all"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-archia font-medium tracking-wide text-[#FEFAE0] bg-white/5 border border-[#CCD5AE]/40 hover:bg-white/10 hover:border-[#FEFAE0] transition-all"
                >
                  <span>Contact Direct</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
