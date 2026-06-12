"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
  onClick?: () => void;
  isActive?: boolean;
};

interface MenuVerticalProps {
  menuItems: MenuItem[];
  color?: string;
  skew?: number;
}

export const MenuVertical = ({
  menuItems = [],
  color = "#D4AF37",
  skew = 0,
}: MenuVerticalProps) => {
  return (
    <div className="flex w-full flex-col">
      {menuItems.map((item, index) => (
        <motion.div
          key={`${item.href}-${index}`}
          className="group/nav relative cursor-pointer"
          initial="initial"
          whileHover="hover"
          onClick={item.onClick}
        >
          {/* Divider line */}
          <div className="absolute bottom-0 left-10 right-10 h-px bg-white/10" />

          <div className="flex items-center gap-4 px-10 py-5 relative">
            {/* Index number */}
            <motion.span
              className="text-sm font-mono tabular-nums min-w-[2ch] text-right"
              style={{ color: item.isActive ? color : "rgba(255,255,255,0.25)" }}
              variants={{
                initial: { color: item.isActive ? color : "rgba(255,255,255,0.25)" },
                hover: { color },
              }}
              transition={{ duration: 0.3 }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>

            {/* Arrow icon */}
            <motion.div
              variants={{
                initial: { x: -20, opacity: 0, color: "inherit" },
                hover: { x: 0, opacity: 1, color },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="z-0"
            >
              <ArrowRight strokeWidth={2.5} className="size-6" />
            </motion.div>

            {/* Label */}
            <motion.span
              variants={{
                initial: {
                  x: -10,
                  color: item.isActive ? color : "rgba(255,255,255,0.9)",
                },
                hover: { x: 0, color, skewX: skew },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="font-semibold text-2xl sm:text-4xl no-underline cursor-pointer tracking-tight"
            >
              {item.label}
            </motion.span>

            {/* Active indicator dot */}
            {item.isActive && (
              <motion.div
                className="w-2 h-2 rounded-full ml-2"
                style={{ backgroundColor: color }}
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Hover background glow */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-lg"
              style={{ backgroundColor: color }}
              variants={{
                initial: { opacity: 0 },
                hover: { opacity: 0.06 },
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
