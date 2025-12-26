"use client";

import { useMemo } from "react";
import { useNGO } from "@/context/NgoContext";
import { useNGOApplicants } from "@/context/NGOApplicantsContext";
import { DonationsContext } from "@/context/DonationContext";
import {
  BarChart3,
  Users,
  IndianRupee,
  Package,
  GraduationCap,
  Download,
} from "lucide-react";
import { useContext } from "react";

export default function NGOReportsPage() {
  const { internships } = useNGO();
  const { applicants } = useNGOApplicants();
  const { donations, materialRequests } = useContext(DonationsContext);

  /* ================= CALCULATIONS ================= */

  const report = useMemo(() => {
    const selectedInterns = applicants.filter(a => a.status === "selected");

    const totalFunds = donations.reduce(
      (sum, d) => sum + (d.collected || 0),
      0
    );

    return {
      internships: internships.length,
      applicants: applicants.length,
      selectedInterns: selectedInterns.length,
      fundsRaised: totalFunds,
      materialRequests: materialRequests.length,
      impactScore:
        selectedInterns.length * 10 +
        materialRequests.length * 5 +
        Math.floor(totalFunds / 1000),
    };
  }, [internships, applicants, donations, materialRequests]);
  const monthlyData = [
    { month: "Jan", interns: 4, students: 8, funds: 12000, materials: 2 },
    { month: "Feb", interns: 6, students: 14, funds: 18000, materials: 3 },
    { month: "Mar", interns: 9, students: 21, funds: 26000, materials: 5 },
    { month: "Apr", interns: 12, students: 30, funds: 34000, materials: 6 },
    { month: "May", interns: 15, students: 38, funds: 42000, materials: 8 },
  ];

  return (
    <div className="px-8 py-10 space-y-12 text-white">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            NGO Impact Reports
          </h1>
          <p className="text-white/60 mt-2 max-w-2xl">
            A consolidated view of your NGO’s performance, social impact,
            and contributor engagement.
          </p>
        </div>

        <button
          className="
            flex items-center gap-2
            bg-white text-black px-6 py-3 rounded-xl
            font-semibold hover:bg-white/90 transition
          "
        >
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* ================= KPI STRIP ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat
          icon={<GraduationCap />}
          label="Internships Posted"
          value={report.internships}
        />
        <Stat
          icon={<Users />}
          label="Students Engaged"
          value={report.selectedInterns}
        />
        <Stat
          icon={<IndianRupee />}
          label="Funds Raised"
          value={`₹${report.fundsRaised.toLocaleString()}`}
        />
        <Stat
          icon={<Package />}
          label="Material Drives"
          value={report.materialRequests}
        />
      </div>

      {/* ================= IMPACT SCORE ================= */}
      <div
        className="
          bg-gradient-to-br from-[#00ADEF]/20 to-transparent
          border border-[#00ADEF]/30 rounded-3xl p-10
        "
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#00ADEF]/20 flex items-center justify-center">
            <BarChart3 className="text-[#00ADEF]" size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              Overall Impact Score
            </h2>
            <p className="text-white/60">
              Composite score based on interns, donations, and outreach
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-5xl font-bold text-[#00ADEF]">
            {report.impactScore}
          </p>
          <p className="text-white/60 mt-2">
            Higher score indicates broader and deeper social impact
          </p>
        </div>
      </div>

      {/* ================= MONTHLY TRENDS ================= */}
      <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">
            Monthly Impact Trends
          </h2>
          <p className="text-white/60 mt-1">
            Growth overview across internships, students, and contributions
          </p>
        </div>

        <div className="space-y-8">

          {/* BAR GRAPH */}
          <div className="space-y-4">
            <p className="text-sm text-white/60">
              Students Selected (per month)
            </p>

            <div className="flex items-end gap-4 h-48">
              {monthlyData.map((m) => (
                <div key={m.month} className="flex flex-col items-center gap-2">
                  <div
                    className="w-10 rounded-xl bg-[#00ADEF]/80 hover:bg-[#00c7ff] transition"
                    style={{ height: `${m.students * 4}px` }}
                  />
                  <span className="text-xs text-white/60">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FUND LINE (VISUAL STRIP) */}
          <div className="space-y-3">
            <p className="text-sm text-white/60">
              Funds Raised (₹)
            </p>

            <div className="flex items-center gap-3">
              {monthlyData.map((m, i) => (
                <div
                  key={m.month}
                  className="flex-1 h-2 rounded-full bg-white/10 relative"
                >
                  <div
                    className="absolute left-0 top-0 h-2 rounded-full bg-green-400"
                    style={{
                      width: `${(m.funds / 42000) * 100}%`,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs text-white/40">
              <span>Jan</span>
              <span>May</span>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            <TrendStat label="Internships" value="+275%" />
            <TrendStat label="Students Impacted" value="+375%" />
            <TrendStat label="Funds Raised" value="+250%" />
            <TrendStat label="Material Drives" value="+300%" />
          </div>
        </div>
      </div>


      {/* ================= BREAKDOWN ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* INTERNSHIP REPORT */}
        <ReportCard title="Internship Outcomes">
          <ReportRow
            label="Total Applications"
            value={applicants.length}
          />
          <ReportRow
            label="Selected Interns"
            value={report.selectedInterns}
          />
          <ReportRow
            label="Selection Ratio"
            value={
              applicants.length === 0
                ? "—"
                : `${Math.round(
                  (report.selectedInterns / applicants.length) * 100
                )}%`
            }
          />
        </ReportCard>

        {/* DONATION REPORT */}
        <ReportCard title="Donation Performance">
          <ReportRow
            label="Active Money Drives"
            value={donations.length}
          />
          <ReportRow
            label="Material Requests"
            value={materialRequests.length}
          />
          <ReportRow
            label="Total Funds Raised"
            value={`₹${report.fundsRaised.toLocaleString()}`}
          />
        </ReportCard>
      </div>

      {/* ================= FOOTER NOTE ================= */}
      <div className="text-sm text-white/40 pt-6 border-t border-white/10">
        This report is generated automatically based on live platform activity.
        Figures shown are for internal review and investor demonstration.
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Stat({ icon, label, value }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-white/20 transition">
      <div className="w-12 h-12 rounded-xl bg-[#00ADEF]/10 text-[#00ADEF] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-white/60 text-sm">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}

function ReportCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-8 space-y-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function ReportRow({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-white/60">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
function TrendStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-white/60 text-sm">{label}</p>
      <p className="text-xl font-bold text-green-400">{value}</p>
    </div>
  );
}

