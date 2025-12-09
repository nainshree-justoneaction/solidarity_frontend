export const ROLES = ["student", "faculty", "institute", "ngo"] as const;

export type Role = (typeof ROLES)[number];

export const roleLabels: Record<Role, string> = {
  student: "Student",
  faculty: "Faculty",
  institute: "Institute",
  ngo: "NGO",
};
