// data/training.ts
export interface Chapter {
  id: string;
  title: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  sdgColor: string;
  chapters: Chapter[];
}

// Example mock JSON
export const trainingModules: Module[] = [
  {
    id: "social-training",
    title: "Social Training",
    description: "Learn the fundamentals of social work.",
    sdgColor: "#e5243b",
    chapters: [
      { id: "1", title: "Introduction to Social Work" },
      { id: "2", title: "Community Engagement" },
      { id: "3", title: "Volunteer Management" },
      { id: "4", title: "Case Studies & Examples" },
    ],
  },
  {
    id: "health-awareness",
    title: "Health Awareness",
    description: "Promote healthy lifestyle practices.",
    sdgColor: "#4c9f38",
    chapters: [
      { id: "1", title: "Nutrition Basics" },
      { id: "2", title: "Mental Health" },
      { id: "3", title: "Hygiene & Sanitation" },
    ],
  },
]
