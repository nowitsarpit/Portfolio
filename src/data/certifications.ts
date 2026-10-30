export interface Certification {
  id: string;
  name: string;
  issuer: string;
  code?: string;
  score?: string;
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
  pdfUrl?: string;
  type: "professional" | "academic" | "coursework";
}

export const certifications: Certification[] = [
  // ─── PROFESSIONAL ────────────────────────────────────────────────────────

  {
    id: "oracle-gen-ai",
    name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    date: "2025",
    type: "professional",
    credentialUrl:
      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=3D010DCCB0358D33A8188AAD32E54B7173E4EF38D819C71A35EB117F5EF991EE",
  },
  {
    id: "oracle-devops",
    name: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
    issuer: "Oracle",
    date: "2025",
    type: "professional",
    credentialUrl:
      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=B6EC88AC53EBB3B374924E76A223AFC77EB2D3FE3997C8E7BF40BEE06DBD3D8F",
  },
  {
    id: "oracle-java",
    name: "Java Certified Foundations Associate",
    issuer: "Oracle",
    code: "1Z0-811",
    date: "2025",
    type: "professional",
    credentialUrl:
      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=64B2311ADD2384F838C9F81B3729B1860338407E2245C202BFCB3DA114E93CC5",
  },

  // ─── COURSEWORK ──────────────────────────────────────────────────────────

  {
    id: "agile-scrum",
    name: "Introduction to Agile Development and Scrum",
    issuer: "IBM / Coursera",
    credentialId: "C6NEPV5M1WM7",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/C6NEPV5M1WM7",
    type: "coursework",
  },
  {
    id: "hpc-parallel",
    name: "Introduction to High-Performance and Parallel Computing",
    issuer: "University of Colorado Boulder / Coursera",
    credentialId: "0MN6LOECCJ2A",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/0MN6LOECCJ2A",
    type: "coursework",
  },
  {
    id: "react-frontend",
    name: "Developing Front-End Apps with React",
    issuer: "IBM / Coursera",
    credentialId: "KX77B5GIGMK7",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/KX77B5GIGMK7",
    type: "coursework",
  },
  {
    id: "os-security",
    name: "Operating Systems: Overview, Administration, and Security",
    issuer: "Coursera",
    credentialId: "3DI0NP0BZAAJ",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/3DI0NP0BZAAJ",
    type: "coursework",
  },
  {
    id: "cybersecurity-foundations",
    name: "The Foundations of Cybersecurity",
    issuer: "Google / Coursera",
    credentialId: "W28W3KRWLJMM",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/W28W3KRWLJMM",
    type: "coursework",
  },
  {
    id: "cpp-hands-on",
    name: "Programming in C++: A Hands-on Introduction",
    issuer: "Codio / Coursera",
    credentialId: "3N32SIL86KPP",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/3N32SIL86KPP",
    type: "coursework",
  },
  {
    id: "ordered-data-structures",
    name: "Ordered Data Structures",
    issuer: "University of Illinois Urbana-Champaign / Coursera",
    credentialId: "NRJLO2W2A6FZ",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/NRJLO2W2A6FZ",
    type: "coursework",
  },
];
