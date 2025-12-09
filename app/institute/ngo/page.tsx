"use client"

import { Topbar } from "@/components/institute/Topbar"
import { mockNGOs, sdgColors } from "@/lib/mock-data"

// SDG colors array for border accent
const SDG_COLORS = [
  "#E5243B", "#DDA63A", "#4C9F38", "#C5192D", "#FF3A21",
  "#26BDE2", "#FCC30B", "#A21942", "#FD6925", "#DD1367",
  "#FD9D24", "#BF8B2E", "#3F7E44", "#0A97D9", "#56C02B",
  "#00689D", "#19486A"
]

export default function InstituteNGOs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Topbar title="Connected NGOs" />
      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNGOs.map((ngo, i) => (
            <div
              key={ngo.id}
              className="bg-[#111111] border border-gray-800 rounded-2xl p-6 hover:border-white transition relative"
              style={{ borderLeft: `4px solid ${SDG_COLORS[i % SDG_COLORS.length]}` }}
            >
              <div className="text-4xl mb-4">{ngo.logo}</div>
              <h3 className="font-bold text-lg mb-1">{ngo.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{ngo.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {ngo.domains.map((domain) => (
                  <TagChip key={domain} label={`SDG ${domain}`} color={sdgColors[domain]} />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-bold ${ngo.status === "Connected" ? "text-[#4C9F38]" : "text-[#FCC30B]"
                    }`}
                >
                  {ngo.status}
                </span>
                <button
                  className="bg-white text-black font-bold py-1 px-3 rounded-lg hover:bg-gray-200 transition text-sm"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface TagChipProps {
  label: string
  color: string
}

export function TagChip({ label, color }: TagChipProps) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  )
}
