"use client"

interface FeedFiltersProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

const filters = [
  { value: "all", label: "All" },
  { value: "thought", label: "Thoughts" },
  { value: "event", label: "Events" },
  { value: "impact", label: "Impact Stories" },
]

export function FeedFilters({ activeFilter, onFilterChange }: FeedFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter.value
              ? "bg-foreground text-background"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
