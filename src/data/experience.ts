export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  mode: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  projects: string[];
  type: "internship" | "job" | "freelance";
}

export const experiences: Experience[] = [
  {
    id: "cogniq-ai",
    company: "COGNIQ AI",
    role: "AI Developer Intern",
    duration: "May 2026 – August 2026",
    startDate: "11 May 2026",
    endDate: "11 August 2026",
    mode: "Online",
    location: "Remote",
    description:
      "Worked as an AI Developer Intern at COGNIQ AI, contributing to mobile application development, CRM software, API development, and technical documentation.",
    responsibilities: [
      "Developed the PawDex mobile application — a cloud-native pet health management platform built on React Native, FastAPI, and Firebase",
      "Built CRM software features for client management workflows",
      "Designed and implemented REST API endpoints using FastAPI with Python",
      "Authored System Requirement Specification (SRS) documentation for developed systems",
      "Integrated Cloudinary media storage with secure, signed upload pipelines for PDF and image handling",
      "Managed Firebase Authentication and Firestore database integrations",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Firebase",
      "Cloudinary",
      "React Native",
      "TypeScript",
      "PostgreSQL",
      "Git",
      "GitHub",
    ],
    projects: ["PawDex", "CRM Software"],
    type: "internship",
  },
];
