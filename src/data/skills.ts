export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Java", "Python", "C++", "JavaScript", "TypeScript"],
  },
  {
    name: "Frontend",
    skills: ["React", "Tailwind CSS", "React Native"],
  },
  {
    name: "Backend",
    skills: ["FastAPI", "Node.js", "Express"],
  },
  {
    name: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Firestore"],
  },
  {
    name: "ML / Data",
    skills: ["scikit-learn", "XGBoost", "LightGBM", "DistilBERT", "ResNet50", "EfficientNet"],
  },
  {
    name: "Cloud / Tools",
    skills: ["Expo", "Git", "GitHub", "Postman", "VS Code", "Render", "Vercel", "Cloudinary"],
  },
  {
    name: "Analytics",
    skills: ["Power BI", "DAX"],
  },
  {
    name: "Cybersecurity",
    skills: ["Kali Linux", "DevSecOps"],
  },
];
