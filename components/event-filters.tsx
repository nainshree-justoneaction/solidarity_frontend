"use client"

interface EventFiltersProps {
  activeType: string
  activeSDG: number | null
  onTypeChange: (type: string) => void
  onSDGChange: (sdg: number | null) => void
}

const eventTypes = [
  { value: "all", label: "All Events" },
  { value: "online", label: "Online" },
  { value: "in-person", label: "In-Person" },
]

const sdgFilters = [
  { sdg: 4, color: "#C5192D", name: "Education" },
  { sdg: 6, color: "#26BDE2", name: "Clean Water" },
  { sdg: 13, color: "#3F7E44", name: "Climate" },
  { sdg: 14, color: "#0A97D9", name: "Ocean" },
  { sdg: 3, color: "#4C9F38", name: "Health" },
]

export function EventFilters({ activeType, activeSDG, onTypeChange, onSDGChange }: EventFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Type Filters */}
      <div className="flex flex-wrap gap-2">
        {eventTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeType === type.value
                ? "bg-foreground text-background"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* SDG Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSDGChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeSDG === null
              ? "bg-foreground text-background"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All SDGs
        </button>
        {sdgFilters.map((filter) => (
          <button
            key={filter.sdg}
            onClick={() => onSDGChange(filter.sdg)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2`}
            style={
              activeSDG === filter.sdg
                ? { backgroundColor: filter.color, color: "white" }
                : { backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }
            }
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: activeSDG === filter.sdg ? "white" : filter.color }}
            />
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  )
}
