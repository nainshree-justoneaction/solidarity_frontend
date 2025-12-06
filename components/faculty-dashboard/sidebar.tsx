"use client"

export default function FacultySidebar() {
  const menuItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "My Students", icon: "📓", sdg: 4 },
    { label: "Internship Approvals", icon: "⚙️", sdg: 8 },
    { label: "Progress Reports", icon: "❤️", sdg: 3 },
    { label: "Messages", icon: "✉️" },
    { label: "Profile", icon: "👤" },
    { label: "Logout", icon: "🚪" },
  ]

  const getSdgColor = (sdg: number) => {
    const colors: Record<number, string> = {
      3: "text-[#4c9f38]",
      4: "text-[#c5192d]",
      8: "text-[#a21942]",
      16: "text-[#0066cc]",
    }
    return colors[sdg] || "text-white"
  }

  return (
    <aside className="w-60 bg-black border-r border-white border-opacity-10 flex flex-col h-screen">
      {/* Brand Header */}
      <div className="px-6 py-6 border-b border-white border-opacity-10">
        <h1 className="text-sm font-bold text-white tracking-tight">SOLIDARITY</h1>
        <p className="text-xs text-white text-opacity-60 mt-1">Faculty Portal</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-px overflow-y-auto">
        {menuItems.map((item, index) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-white border border-transparent ${
              index === 0 ? "bg-white bg-opacity-5 border-white border-opacity-10" : ""
            }`}
          >
            <span className={`text-base ${item.sdg ? getSdgColor(item.sdg) : "text-white text-opacity-60"}`}>
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white border-opacity-10">
        <button className="w-full px-4 py-2 text-xs font-medium text-white border border-white border-opacity-10">
          Log Out
        </button>
      </div>
    </aside>
  )
}
