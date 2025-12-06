"use client"

export default function InternshipApprovalsSection() {
  const approvals = [
    {
      id: "1",
      studentName: "Aarav Sharma",
      ngoName: "Green Earth Foundation",
      internshipTitle: "Environmental Outreach",
      duration: "3 months",
      status: "Pending",
    },
    {
      id: "2",
      studentName: "Priya Verma",
      ngoName: "Community Health Initiative",
      internshipTitle: "Healthcare Coordinator",
      duration: "6 weeks",
      status: "Pending",
    },
    {
      id: "3",
      studentName: "Anaya Patel",
      ngoName: "Education for All",
      internshipTitle: "Learning Assistant",
      duration: "2 months",
      status: "Approved",
    },
  ]

  return (
    <div className="bg-white border border-black border-opacity-100">
      {/* Header with SDG icon */}
      <div className="px-6 py-4 border-b border-black border-opacity-100 flex items-center gap-2">
        <span className="text-sm" style={{ color: "#a21942" }}>
          ⚙️
        </span>
        <h3 className="text-sm font-bold text-black">Internship Approvals</h3>
      </div>

      {/* Cards Grid - 3 per row */}
      <div className="grid grid-cols-1 gap-4 p-6">
        {approvals.map((approval) => (
          <div key={approval.id} className="border border-black border-opacity-100 p-4">
            <p className="text-sm font-bold text-black">{approval.internshipTitle}</p>
            <p className="text-xs text-black text-opacity-60 mt-2">{approval.studentName}</p>
            <p className="text-xs text-black text-opacity-60">{approval.ngoName}</p>
            <p className="text-xs text-black text-opacity-50 mt-1">{approval.duration}</p>

            <div className="flex items-center justify-between mt-4">
              <span
                className={`text-xs font-medium px-2 py-1 border border-black ${
                  approval.status === "Pending"
                    ? "border-opacity-100 bg-black text-white"
                    : "border-opacity-50 text-black"
                }`}
              >
                {approval.status}
              </span>

              {approval.status === "Pending" && (
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1 border border-black border-opacity-100 text-black font-medium">
                    Approve
                  </button>
                  <button className="text-xs px-3 py-1 border border-black border-opacity-50 text-black font-medium">
                    Decline
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
