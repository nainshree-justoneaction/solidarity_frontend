"use client"

export default function Reports() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">Reports & Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <div className="border border-white/10 rounded p-6 bg-black/30">
          <h3 className="text-lg font-bold text-white mb-6">Internship Applications Trend</h3>
          <div className="h-48 flex items-end gap-2">
            {[45, 52, 48, 65, 72, 68, 78].map((value, idx) => (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-[#e5243b]/40 to-[#e5243b]/60 rounded-t hover:from-[#e5243b]/60 hover:to-[#e5243b]/80 transition-all border-t border-[#e5243b]/20 group cursor-pointer"
                style={{ height: `${(value / 100) * 100}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white text-center -translate-y-6">
                  {value}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-secondary text-xs mt-4">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="border border-white/10 rounded p-6 bg-black/30">
          <h3 className="text-lg font-bold text-white mb-6">SDG Program Distribution</h3>
          <div className="space-y-4">
            {[
              { label: "Health (SDG 3)", value: 28, color: "bg-[#4c9f38]" },
              { label: "Education (SDG 4)", value: 22, color: "bg-[#c5192d]" },
              { label: "Environment (SDG 13)", value: 18, color: "bg-[#407f3d]" },
              { label: "Community (SDG 1)", value: 32, color: "bg-[#e5243b]" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary text-sm">{item.label}</span>
                  <span className="text-white font-bold text-sm">{item.value}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} transition-all`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
