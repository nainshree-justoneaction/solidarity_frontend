"use client"

interface CircularProgressProps {
  value: number
  size?: number
  stroke?: number
}

export function CircularProgress({
  value,
  size = 44,
  stroke = 4,
}: CircularProgressProps) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  const color =
    value < 40 ? "#f87171" : value < 70 ? "#facc15" : "#00ADEF"

  return (
    <svg width={size} height={size}>
      {/* Background */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={stroke}
        fill="transparent"
      />

      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 0.4s ease",
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
        }}
      />
    </svg>
  )
}
