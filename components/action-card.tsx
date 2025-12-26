"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import clsx from "clsx"

interface ActionCardProps {
  title: string
  description: string
  icon: any
  href: string
  color: string
  actions?: number        // ✅ optional
  highlight?: boolean
}

export function ActionCard({
  title,
  description,
  icon: Icon,
  href,
  color,
  actions,
  highlight = false,
}: ActionCardProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "group relative rounded-2xl border p-6 transition-all duration-300",
        "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10",
        highlight && "ring-2 ring-offset-2 ring-offset-black"
      )}
      style={highlight ? { ringColor: color } : {}}
    >
      {/* ICON */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}22`, color }}
      >
        <Icon size={22} />
      </div>

      {/* CONTENT */}
      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
      </h3>

      <p className="text-sm text-white/70 mb-6 leading-relaxed">
        {description}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        {/* ✅ SAFE RENDER */}
        {typeof actions === "number" ? (
          <span className="text-xs text-muted-foreground">
            {actions.toLocaleString()} actions taken
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">
            Make an impact today
          </span>
        )}

        <span
          className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
          style={{ color }}
        >
          Take action
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  )
}
