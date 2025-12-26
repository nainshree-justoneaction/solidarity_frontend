// lib/registrationConfig.ts

export const registrationSteps = {
  student: {
    step1: [
      { name: "fullName", label: "Full Name", type: "text", min: 3, required: true },
      { name: "Date of Birth", label: "Age", type: "number", min: 15, max: 40, required: true },
      { name: "gender", label: "Gender", type: "radio", options: ["male", "female", "other"], required: true },
      { name: "about", label: "Short Bio (About You)", type: "textarea", min: 10, required: true },
    ],
    step2: [
      { name: "institute", label: "Institute / College", type: "text", min: 3, required: true },
      { name: "semester", label: "Semester", type: "text", min: 1, required: true },
      { name: "skills", label: "Skills / Competencies", type: "textarea", min: 5, required: true },
    ],
    step3: [
      { name: "projects", label: "Projects Interested In", type: "textarea", min: 10, required: false },
      { name: "linkedin", label: "LinkedIn Profile (optional)", type: "text", required: false },
    ],
  },

  faculty: {
    step1: [
      { name: "fullName", label: "Full Name", type: "text", min: 3, required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "text", min: 10, max: 10, required: true },
    ],
    step2: [
      { name: "experience", label: "Experience (years)", type: "number", min: 0, required: true },
      { name: "expertise", label: "Expertise / Domain", type: "textarea", min: 5, required: true },
      { name: "associatedStudents", label: "Associated Students (optional)", type: "text", required: false },
    ],
    step3: [
      { name: "courses", label: "Courses / Workshops Conducted", type: "textarea", min: 5, required: true },
    ],
  },

  institute: {
    step1: [
      { name: "name", label: "Institute Name", type: "text", min: 3, required: true },
      { name: "email", label: "Admin Email", type: "email", required: true },
    ],
    step2: [
      { name: "address", label: "Institute Address", type: "text", min: 5, required: true },
      { name: "programs", label: "Programs Offered", type: "textarea", min: 5, required: true },
    ],
    step3: [
      { name: "website", label: "Website (optional)", type: "text", required: false },
      { name: "contactPerson", label: "Contact Person Name", type: "text", min: 3, required: true },
    ],
  },

  ngo: {
    step1: [
      { name: "name", label: "NGO Name", type: "text", min: 3, required: true },
      { name: "email", label: "NGO Email", type: "email", required: true },
    ],
    step2: [
      { name: "registrationNumber", label: "Registration Number", type: "text", min: 3, required: true },
      { name: "registrationDate", label: "Date of Registration", type: "date" },
      { name: "taxExemption", label: "12A/80G Tax Exemption (Yes/No)", type: "radio", options: ["Yes", "No"], required: true },
      { name: "panNumber", label: "PAN Number", type: "text", min: 10, max: 10, required: true },
      { name: "contactPerson", label: "Contact Person", type: "text", min: 3, required: true },
    ],

    step3: [
      { name: "mission", label: "Mission Statement", type: "textarea", min: 10, required: true },
      { name: "projects", label: "Ongoing Projects", type: "textarea", min: 5, required: true },
      { name: "website", label: "Website (optional)", type: "text", required: false },
      { name: "volunteers", label: "Number of Volunteers", type: "number", min: 0, required: true },
    ],
  },
};

// Display labels
export const roleLabels: Record<string, string> = {
  student: "Student",
  faculty: "Faculty",
  institute: "Institute",
  ngo: "NGO",
};
