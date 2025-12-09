"use client"

interface InternshipCardProps {
  icon: string
  title: string
  organization: string
  description: string
  duration?: string
  mode?: string
  seats?: number
  sdgColor?: string
  onClick?: () => void
}

export function InternshipCard({
  icon,
  title,
  organization,
  description,
  duration,
  mode,
  seats,
  sdgColor = "#fff",
  onClick,
}: InternshipCardProps) {
  return (
    <div
      className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 hover:border-white transition relative"
      style={{ borderLeft: `4px solid ${sdgColor}` }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-gray-300 text-sm">{organization}</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>

      {(duration || mode || seats) && (
        <div className="flex gap-3 mb-4 text-xs">
          {duration && (
            <span className="bg-[#1F1F1F] px-2 py-1 rounded">{`📅 ${duration}`}</span>
          )}
          {mode && <span className="bg-[#1F1F1F] px-2 py-1 rounded">{`🌐 ${mode}`}</span>}
          {seats && (
            <span className="bg-[#1F1F1F] px-2 py-1 rounded">{`👥 ${seats} seats`}</span>
          )}
        </div>
      )}

      <button
        onClick={onClick}
        className="w-full bg-white text-black font-bold py-2 px-4 rounded-xl hover:border-[3px] hover:border-sdg transition"
        style={{ borderColor: sdgColor }}
      >
        {organization ? "View Details" : "Apply Now"} →
      </button>
    </div>
  )
}
