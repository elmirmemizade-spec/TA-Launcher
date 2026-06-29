"use client";

import React from "react";
import { MessageCircle, ChevronRight } from "lucide-react";

interface DiscordCardProps {
  href?: string;
  className?: string;
}

export default function DiscordCard({ href = "https://discord.gg/5EXkvEert", className = "" }: DiscordCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-between gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#5865F2] to-[#4752C4] px-6 py-3.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(88,101,242,0.6)] ${className}`}
    >
      {/* Shimmer/Glow Effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      
      {/* Animated Glow Border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5865F2] via-[#EB459E] to-[#5865F2] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60" />
      
      {/* Content */}
      <div className="relative flex items-center gap-3">
        {/* Discord Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/20">
          <MessageCircle className="h-6 w-6 text-white" />
        </div>
        
        {/* Text Content */}
        <div className="flex flex-col">
          <span className="text-lg font-bold text-white">Discord</span>
          <span className="text-sm text-white/80">Join community</span>
        </div>
      </div>

      {/* Right Arrow */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20 group-hover:translate-x-1">
        <ChevronRight className="h-5 w-5 text-white" />
      </div>
    </a>
  );
}