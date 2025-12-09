"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function InternshipDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const internships = [
    {
      id: "1",
      title: "Environmental Educator",
      ngo: "Green Earth Foundation",
      duration: "3 months",
      mode: "Hybrid",
      hours: "20 hours/week",
      location: "New Delhi",
      sdgIcon: "🌍",
      description:
        "Join Green Earth Foundation as an Environmental Educator and help communities understand the importance of environmental conservation.",
      expectations: [
        "Develop and deliver environmental education workshops",
        "Create engaging educational materials",
        "Collaborate with schools and communities",
        "Document impact and outcomes",
        "Participate in team meetings and training",
      ],
      color: "#009739",
    },
    {
      id: "2",
      title: "Education Support Coordinator",
      ngo: "Learn to Lead",
      duration: "6 months",
      mode: "On-site",
      hours: "15 hours/week",
      location: "Mumbai",
      sdgIcon: "📚",
      description:
        "Support the academic leadership team in shaping learning experiences in underserved communities.",
      expectations: [
        "Assist teachers in classrooms",
        "Prepare learning resources",
        "Coordinate field activities",
      ],
      color: "#2E7D32",
    },
    {
      id: "3",
      title: "Water Project Assistant",
      ngo: "Clean Water Initiative",
      duration: "4 months",
      mode: "Hybrid",
      hours: "18 hours/week",
      location: "Bengaluru",
      sdgIcon: "💧",
      description:
        "Assist in planning and monitoring clean water access programs for rural and semi-urban regions.",
      expectations: [
        "Survey water access challenges",
        "Support water testing operations",
        "Assist project managers with field visits",
        "Prepare weekly progress reports",
      ],
      color: "#0277BD",
    },
    {
      id: "4",
      title: "Marine Research Intern",
      ngo: "Ocean Guardians",
      duration: "3 months",
      mode: "On-site",
      hours: "25 hours/week",
      location: "Goa",
      sdgIcon: "🌊",
      description:
        "Work with marine experts to study ocean biodiversity and support conservation activities.",
      expectations: [
        "Assist in collecting marine samples",
        "Document beach pollution patterns",
        "Participate in underwater cleanups",
        "Prepare data reports for researchers",
      ],
      color: "#01579B",
    },
    {
      id: "5",
      title: "Community Development Officer",
      ngo: "Social Impact Hub",
      duration: "6 months",
      mode: "Hybrid",
      hours: "20 hours/week",
      location: "Chennai",
      sdgIcon: "👥",
      description:
        "Work with marginalized communities to identify challenges and help implement social development programs.",
      expectations: [
        "Conduct community surveys",
        "Prepare development proposals",
        "Assist in awareness campaigns",
        "Coordinate with volunteers",
      ],
      color: "#6A1B9A",
    },
    {
      id: "6",
      title: "Food Security Project Lead",
      ngo: "Nourish Foundation",
      duration: "3 months",
      mode: "On-site",
      hours: "16 hours/week",
      location: "Pune",
      sdgIcon: "🌾",
      description:
        "Lead community food distribution initiatives and support nutritional awareness campaigns.",
      expectations: [
        "Manage food distribution drives",
        "Prepare nutrition awareness material",
        "Coordinate with local volunteers",
        "Document challenges and improvements",
      ],
      color: "#F9C80E",
    },
    {
      id: "7",
      title: "Healthcare Access Advocate",
      ngo: "Health for All",
      duration: "4 months",
      mode: "Hybrid",
      hours: "12 hours/week",
      location: "Lucknow",
      sdgIcon: "🏥",
      description:
        "Support healthcare outreach programs by assisting doctors and NGO teams during field activities.",
      expectations: [
        "Help organize health camps",
        "Collect basic health data",
        "Assist in patient coordination",
        "Prepare awareness posters",
      ],
      color: "#D32F2F",
    },
    {
      id: "8",
      title: "Renewable Energy Consultant",
      ngo: "Clean Tech Solutions",
      duration: "5 months",
      mode: "Remote",
      hours: "10 hours/week",
      location: "Remote",
      sdgIcon: "⚡",
      description:
        "Work with engineers to analyze clean energy solutions for school and community-level projects.",
      expectations: [
        "Evaluate solar installation feasibility",
        "Prepare renewable energy reports",
        "Assist engineering team with data collection",
      ],
      color: "#FFA000",
    },
    // add the rest exactly same way...
  ];

  const internship = internships.find((i) => i.id === id);

  if (!internship) {
    return (
      <div className="text-white p-20 text-center text-2xl">
        Internship Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-12 py-8 border-b border-white/10">
        <button
          onClick={() => router.back()}
          className="text-white hover:scale-105 transition-transform"
        >
          ← Back to Internships
        </button>
        <div className="text-2xl font-bold">Solidarity</div>
        <div></div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-12 py-24">
        <div className="flex items-start gap-8 mb-16">
          <div className="text-6xl">{internship.sdgIcon}</div>
          <div>
            <p className="text-white/60 mb-2">{internship.ngo}</p>
            <h1 className="text-5xl font-bold">{internship.title}</h1>
          </div>
        </div>

        {/* Description */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">About This Internship</h2>
          <p className="text-lg text-white/80 leading-relaxed mb-8">
            {internship.description}
          </p>
        </div>

        {/* Key Details */}
        <div className="mb-16 grid grid-cols-2 gap-12">
          <Detail label="Duration" value={internship.duration} />
          <Detail label="Mode" value={internship.mode} />
          <Detail label="Commitment" value={internship.hours} />
          <Detail label="Location" value={internship.location} />
        </div>

        {/* Expectations */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">What's Expected</h2>
          <ul className="space-y-4 text-lg text-white/80">
            {internship.expectations.map((exp, i) => (
              <li key={i} className="flex gap-4">
                <span>•</span> {exp}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA - dynamic color */}
        <button
          style={{ background: internship.color }}
          className="inline-block text-2xl font-semibold px-12 py-4 text-white hover:scale-105 transition-transform"
        >
          Apply for This Internship
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-white/40 mb-2">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
