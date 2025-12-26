"use client"

interface StatCardProps {
  label: string
  value: string
  subtext?: string
  color?: string
}

export function StatCard({ label, value, subtext, color }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group hover:border-foreground/20 transition-colors">
      {color && <div className="absolute top-0 left-0 w-1 h-full opacity-80" style={{ backgroundColor: color }} />}
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className="text-4xl md:text-5xl font-bold tracking-tight">{value}</p>
      {subtext && <p className="text-sm text-muted-foreground mt-2">{subtext}</p>}
    </div>
  )
}
