"use client"

export default function FacultyNavbar() {
  return (
    <nav className="h-16 bg-white border-b border-black border-opacity-10 flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <h2 className="text-sm font-bold text-black">Dr. Rajesh Kumar</h2>
          <p className="text-xs text-black text-opacity-60">Faculty - Institute of Social Impact</p>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 mx-6 hidden md:flex">
        <input
          type="text"
          placeholder="Search students, internships..."
          className="w-full px-4 py-2 text-xs text-black bg-transparent border border-black border-opacity-10 placeholder-black placeholder-opacity-40"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <button className="text-black text-opacity-60 text-lg">🔔</button>
        <div className="w-8 h-8 bg-black flex items-center justify-center border border-white">
          <span className="text-white text-xs font-bold">RK</span>
        </div>
      </div>
    </nav>
  )
}
