"use client"

import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

export default function Button({ variant = "primary", size = "md", className = "", children, ...props }: ButtonProps) {
  const baseStyles = "font-semibold rounded-full transition-all duration-300 active:scale-95"

  /* Updated variants for high-contrast black background design */
  const variants = {
    primary: "bg-white text-black hover:shadow-lg hover:shadow-white/20 hover:scale-105",
    secondary: "border-2 border-white text-white hover:bg-white/10 hover:border-white/80",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
