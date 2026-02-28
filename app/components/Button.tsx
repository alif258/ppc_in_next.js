"use client";

import { useState } from "react";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  label = "Let's Go Further",
  onClick,
  className = "",
  bgColor = "#ffffff",
  textColor = "#111111",
  hoverBgColor = "#111111",
  hoverTextColor = "#ffffff",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const isHovered = hovered && !disabled;

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border-none whitespace-nowrap overflow-hidden transition-colors duration-350
        px-2 py-2 pl-3 text-[13px]
        md:px-2 md:py-2 md:pl-4 md:text-[15px]
        lg:px-3 lg:py-3 lg:pl-5 lg:text-[17px]
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}`}
      style={{
        position: "relative",
        background: bgColor,
        color: isHovered ? hoverTextColor : textColor,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        letterSpacing: "-0.01em",
        transition: "color 0.35s ease",
      }}
    >
      {/* Sliding bg */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "999px",
          background: hoverBgColor,
          transform: isHovered ? "translateX(0%)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.77, 0, 0.175, 1)",
          zIndex: 0,
        }}
      />

      {/* Label */}
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>

      {/* Arrow badge */}
      <span
        className="inline-flex items-center justify-center rounded-full flex-shrink-0
          w-[26px] h-[26px] text-[13px]
          md:w-[32px] md:h-[32px] md:text-[15px]
          lg:w-[40px] lg:h-[40px] lg:text-[17px]"
        style={{
          position: "relative",
          zIndex: 1,
          background: isHovered ? bgColor : hoverBgColor,
          color: isHovered ? hoverBgColor : bgColor,
          transition: "background 0.35s ease, color 0.35s ease",
        }}
      >
        →
      </span>
    </button>
  );
}