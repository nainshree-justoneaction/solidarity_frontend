"use client";
import { useContext, useMemo, useState } from "react";
import { NGOContext } from "@/context/NgoContext"; 
import ApplicantCard from "@/components/ngo/ApplicantCard";
import StudentProfileModal from "@/components/ngo/StudentProfileModal";
import { useRouter, useParams } from "next/navigation";

export default function InternshipDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const { state, setState } = useContext(NGOContext);

  // ---- SAFE FETCHING ----
  const internship = useMemo(() => {
    return state?.internships?.find((i: any) => String(i.id) === String(id)) || null;
  }, [state.internships, id]);

  const applications = useMemo(() => {
    return state?.applications?.filter((a: any) => String(a.internshipId) === String(id)) || [];
  }, [state.applications, id]);

  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  if (!internship) {
    return (
      <div className="text-zinc-400">
        Internship not found or not loaded.
      </div>
    );
  }

  // ---- SELECT HANDLER ----
  function handleSelect(app: any) {
    const updatedApps = state.applications.map((x: any) =>
      x.id === app.id ? { ...x, status: "selected" } : x
    );

    const selectedEntry = {
      ...app,
      selectedAt: new Date().toISOString(),
    };

    const newSelectedInterns = [
      ...(state.selectedInterns || []),
      selectedEntry,
    ];

    setState({
      ...state,
      applications: updatedApps,
      selectedInterns: newSelectedInterns,
    });

    alert("Student selected. Track them from the Track page.");
  }

  // ---- REJECT HANDLER ----
  function handleReject(app: any) {
    const updatedApps = state.applications.map((x: any) =>
      x.id === app.id ? { ...x, status: "rejected" } : x
    );

    setState({ ...state, applications: updatedApps });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{internship.title}</h1>
          <p className="text-zinc-400 text-sm">{internship.description}</p>
        </div>
        <button
          onClick={() => router.push("/ngo/internships")}
          className="text-zinc-300"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applicants */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">
              Applicants ({applications.length})
            </h3>
            <div className="text-zinc-400 text-sm">
              Select candidates to onboard
            </div>
          </div>

          <div className="space-y-3">
            {applications.length === 0 && (
              <div className="text-zinc-400">No applicants yet.</div>
            )}

            {applications.map((app: any) => (
              <ApplicantCard
                key={app.id}
                application={app}
                student={app.student}
                onView={() => setSelectedStudent(app.student)}
                onSelect={() => handleSelect(app)}
                onReject={() => handleReject(app)}
              />
            ))}
          </div>
        </div>

        {/* Internship Info */}
        <div className="space-y-4 bg-[#0F0F0F] border border-[#202020] rounded-xl p-4">
          <h4 className="text-white font-semibold">Internship Info</h4>
          <div className="text-zinc-300 text-sm">
            Location: {internship.location || "Not specified"}
          </div>
          <div className="text-zinc-300 text-sm">
            Mode: {internship.mode || "N/A"}
          </div>
          <div className="text-zinc-300 text-sm">
            Skills: {(internship.requiredSkills || []).join(", ") || "N/A"}
          </div>
          <div className="text-zinc-300 text-sm">
            Applicants: {applications.length}
          </div>
        </div>
      </div>

      <StudentProfileModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}
