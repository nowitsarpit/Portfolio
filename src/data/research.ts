export interface ResearchPaper {
  id: string;
  title: string;
  journal: string;
  publisher: string;
  year: number;
  volume?: number;
  issue?: number;
  articleNumber?: string;
  doi?: string;
  url?: string;
  pdfUrl?: string;
  abstract?: string;
  keywords: string[];
  myRole: "reference" | "co-author" | "author";
  myRoleDescription: string;
  relatedTopics: string[];
}

export const researchPapers: ResearchPaper[] = [
  {
    id: "project-vajra",
    title:
      "Project Vajra: Automated Intelligent Defence Agent of Cybersecurity",
    journal: "CISIT Easychair",
    publisher: "CISIT Easychair",
    year: 2026,
    pdfUrl: "/papers/project-vajra-cisit-2026.pdf",
    keywords: [
      "DDoS",
      "Cybersecurity",
      "Machine Learning",
      "Deep Learning",
      "CI/CD",
      "Zero-Day Threats",
      "Intrusion Detection",
      "Network Security",
    ],
    abstract:
      "An autonomous cyber defence platform using a hybrid AI core — combining machine learning and deep learning — to detect and counter DDoS attacks in real-time through network flow analysis. Natively integrated with CI/CD pipelines for automated model retraining, enabling continuous adaptation against emerging zero-day threats with zero downtime.",
    myRole: "co-author",
    myRoleDescription:
      "Co-authored this paper on an autonomous AI-driven cybersecurity defence system targeting DDoS threats, integrating ML/DL with DevSecOps CI/CD pipelines.",
    relatedTopics: [
      "DDoS Defence",
      "AI / ML",
      "DevSecOps",
      "Intrusion Detection Systems",
      "CI/CD Pipelines",
      "Network Security",
      "Zero-Day Threat Response",
    ],
  },
  {
    id: "digital-twin-healthcare",
    title:
      "Digital Twin for Personalized Healthcare using Generative AI: A Leakage-Free Explainable Machine Learning Framework",
    journal: "In Progress",
    publisher: "In Progress",
    year: 2026,
    keywords: [
      "Digital Twin",
      "Healthcare AI",
      "Explainable ML",
      "Generative AI",
      "Diabetes Risk Prediction",
      "NHANES",
      "RAG",
      "Class Imbalance",
      "Threshold Optimization",
    ],
    abstract:
      "A Digital Twin framework combining structured patient health-state modeling with leakage-free explainable machine learning for diabetes-risk prediction on a 7,809-participant NHANES cohort. Evaluates threshold-aware model performance — achieving up to 82.55% balanced accuracy — and provides an architectural basis for integrating explainable predictions with Generative AI and Retrieval-Augmented Generation for personalized healthcare insights.",
    myRole: "co-author",
    myRoleDescription:
      "Co-authoring this paper on a Digital Twin + Explainable ML framework for personalized diabetes-risk assessment, integrating Generative AI and RAG for evidence-grounded health insights.",
    relatedTopics: [
      "Digital Twin Systems",
      "Healthcare AI",
      "Explainable AI (XAI)",
      "Generative AI",
      "Retrieval-Augmented Generation",
      "Ensemble Learning",
      "Diabetes Risk Modelling",
    ],
  },
];
