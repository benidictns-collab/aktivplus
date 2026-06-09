"use client";

import React from "react";
import {
  Home,
  Users,
  LayoutGrid,
  Briefcase,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type GradientMenuItem = {
  title: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  onClick?: () => void;
  isActive?: boolean;
};

interface GradientMenuProps {
  menuItems: GradientMenuItem[];
}

export const GradientMenu = ({ menuItems = [] }: GradientMenuProps) => {
  return (
    <ul className="flex gap-2">
      {menuItems.map(
        ({ title, icon: Icon, gradientFrom, gradientTo, onClick, isActive }, idx) => (
          <li
            key={idx}
            style={{ "--gradient-from": gradientFrom, "--gradient-to": gradientTo } as React.CSSProperties}
            className={`relative h-[48px] rounded-full flex items-center justify-center transition-all duration-500 hover:w-[160px] group cursor-pointer ${
              isActive
                ? "w-[160px] bg-white/5 border border-white/10"
                : "w-[48px] bg-white/[0.07] border border-white/[0.08]"
            }`}
            onClick={onClick}
          >
            {/* Gradient background on hover / active */}
            <span
              className={`absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-all duration-500 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            />

            {/* Blur glow */}
            <span
              className={`absolute top-[8px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] -z-10 transition-all duration-500 ${
                isActive ? "opacity-40" : "opacity-0 group-hover:opacity-50"
              }`}
            />

            {/* Icon */}
            <span
              className={`relative z-10 transition-all duration-300 ${
                isActive ? "scale-0" : "scale-100 group-hover:scale-0"
              }`}
            >
              <Icon className="size-5 text-white/70" />
            </span>

            {/* Title */}
            <span
              className={`absolute text-white uppercase tracking-wide text-sm font-semibold whitespace-nowrap transition-all duration-500 ${
                isActive ? "scale-100" : "scale-0 group-hover:scale-100"
              }`}
              style={{ transitionDelay: isActive ? "0ms" : "100ms" }}
            >
              {title}
            </span>
          </li>
        )
      )}
    </ul>
  );
};

/**
 * Pre-configured menu items matching the site navigation.
 * Each item has a lucide icon and a gold-gradient color scheme.
 */
export const siteMenuConfig: {
  title: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
}[] = [
  {
    title: "Главная",
    icon: Home,
    gradientFrom: "#D4AF37",
    gradientTo: "#F1D28A",
  },
  {
    title: "О нас",
    icon: Users,
    gradientFrom: "#C9A030",
    gradientTo: "#E8C84A",
  },
  {
    title: "Каталог",
    icon: LayoutGrid,
    gradientFrom: "#B8942E",
    gradientTo: "#D4AF37",
  },
  {
    title: "Услуги",
    icon: Briefcase,
    gradientFrom: "#D4AF37",
    gradientTo: "#B8942E",
  },
  {
    title: "Контакты",
    icon: Phone,
    gradientFrom: "#F1D28A",
    gradientTo: "#D4AF37",
  },
];
