export const programmeSlugs = [
  "ms-quantum-computing",
  "ms-data-science",
  "pg-diploma-data-science",
  "diploma-python-ai-ml-generative-ai",
  "diploma-data-visualization",
  "diploma-cloud-technologies",
] as const;

export type ProgrammeSlug = (typeof programmeSlugs)[number];
export type AdmissionType = "quantum" | "data-science" | "diploma";

export type Programme = {
  slug: ProgrammeSlug;
  name: string;
  subtitle: string;
  intro: string;
  duration: string;
  mode: string;
  highlights: readonly string[];
  admissionType: AdmissionType;
  admissionSummary: string;
  hasPreferredSpell: boolean;
};

export const programmes = [
  {
    slug: "ms-quantum-computing",
    name: "M.S. Quantum Computing",
    subtitle: "Develop knowledge and practical skills in quantum technologies.",
    intro: "An industry-collaborative programme combining quantum computing foundations, practical implementation and research.",
    duration: "2 years / 4 semesters",
    mode: "Hybrid (online / offline)",
    highlights: [
      "Quantum algorithms and quantum machine learning",
      "Quantum circuit implementation and simulation using IBM Qiskit",
      "Research projects and industrial training",
      "Academic learning supported by industry collaboration",
    ],
    admissionType: "quantum",
    admissionSummary: "As notified by SVU",
    hasPreferredSpell: false,
  },
  {
    slug: "ms-data-science",
    name: "M.S. Data Science",
    subtitle: "Connect data science knowledge with practical applications.",
    intro: "Develop an understanding of data science, artificial intelligence and machine learning through academic study, guided practice and project-based learning.",
    duration: "2 years",
    mode: "Hybrid",
    highlights: [
      "Foundations of data science, artificial intelligence and machine learning",
      "Work with datasets and industry use cases",
      "Applied learning through guided projects",
      "Guidance from academic faculty and industry professionals",
    ],
    admissionType: "data-science",
    admissionSummary: "Annual admission as officially notified",
    hasPreferredSpell: false,
  },
  {
    slug: "pg-diploma-data-science",
    name: "PG Diploma in Data Science",
    subtitle: "Strengthen your ability to work with data and interpret results.",
    intro: "Develop a practical understanding of data science through structured learning, guided exercises and applied project work.",
    duration: "1 year",
    mode: "Hybrid / Part-time",
    highlights: [
      "Data preparation, analysis and interpretation",
      "Practical exercises with data",
      "Approaches to real-world data problems",
      "Project learning with academic guidance",
    ],
    admissionType: "diploma",
    admissionSummary: "January and July spells",
    hasPreferredSpell: true,
  },
  {
    slug: "diploma-python-ai-ml-generative-ai",
    name: "Diploma in Python for AI, ML & Gen AI",
    subtitle: "Build programming skills for intelligent applications.",
    intro: "Develop Python programming knowledge and explore its applications in artificial intelligence, machine learning and generative AI.",
    duration: "6 months",
    mode: "Part-time · Delivery mode: Confirm with the admissions team",
    highlights: [
      "Python programming fundamentals",
      "Working with data",
      "AI, machine learning and generative AI workflows",
      "Guided programming exercises",
    ],
    admissionType: "diploma",
    admissionSummary: "January and July spells",
    hasPreferredSpell: true,
  },
  {
    slug: "diploma-data-visualization",
    name: "Diploma in Data Visualization",
    subtitle: "Turn data into clear and meaningful visual insights.",
    intro: "Learn visual analysis and presentation techniques to communicate findings and support informed decisions.",
    duration: "6 months",
    mode: "Part-time · Delivery mode: Confirm with the admissions team",
    highlights: [
      "Data visualization principles",
      "Chart selection for clear communication",
      "Dashboards and visual storytelling",
      "Exercises in communicating insights",
    ],
    admissionType: "diploma",
    admissionSummary: "January and July spells",
    hasPreferredSpell: true,
  },
  {
    slug: "diploma-cloud-technologies",
    name: "Diploma in Cloud Technologies",
    subtitle: "Understand cloud technologies and their practical applications.",
    intro: "Develop foundational knowledge of cloud technologies and the services that support modern application environments.",
    duration: "6 months",
    mode: "Part-time · Delivery mode: Confirm with the admissions team",
    highlights: [
      "Cloud concepts and service models",
      "Compute, storage and networking",
      "Cloud application environments",
      "Practical cloud use cases",
    ],
    admissionType: "diploma",
    admissionSummary: "January and July spells",
    hasPreferredSpell: true,
  },
] as const satisfies readonly Programme[];

export function programmePath(programme: Pick<Programme, "slug">) {
  return `/programmes/${programme.slug}`;
}

export function getProgramme(slug: string | undefined) {
  return programmes.find((programme) => programme.slug === slug);
}
