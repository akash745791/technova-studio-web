"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  lightMode?: boolean;
}

export default function Logo({ className = "", showTagline = false, size = "md" }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const symbolSizes = {
    sm: 30,
    md: 38,
    lg: 52,
  };

  return (
    <Link href="/" className={`group inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official TN Brand Emblem in an Editorial Frame */}
      <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-[#FEFAE0] border border-[#CCD5AE] group-hover:border-[#D4A373] transition-all duration-300 shadow-sm p-0.5">
        {!imageError ? (
          <Image
            src="/brand/technova-logo.jpg"
            alt="TECHNOVA STUDIO Mark"
            width={symbolSizes[size]}
            height={symbolSizes[size]}
            className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            priority
          />
        ) : (
          <div className="w-9 h-9 flex items-center justify-center p-1.5 bg-[#041214] rounded-md">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M15 25H60V38H44V85H29V38H15V25Z" fill="#FEFAE0" />
              <path d="M48 30L78 72V30H92V85H76L46 43V85H32V30H48Z" fill="#D4A373" />
            </svg>
          </div>
        )}
      </div>

      {/* Moniqa Editorial Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center text-[#1F2421]">
          <span className="font-display text-lg sm:text-xl font-normal tracking-[0.12em] leading-none">
            TECHNOVA
          </span>
          <span className="ml-1.5 text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#E9EDC9] text-[#A06733] font-mono tracking-widest font-bold border border-[#CCD5AE]">
            STUDIO
          </span>
        </div>
        {showTagline && (
          <span className="text-[9px] tracking-[0.2em] text-[#5B6358] uppercase font-mono mt-0.5">
            Ideas / Code / Real Solutions
          </span>
        )}
      </div>
    </Link>
  );
}
