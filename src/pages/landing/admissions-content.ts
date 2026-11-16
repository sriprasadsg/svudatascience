// Domestic Admissions only; international equivalence and admission rules are separate.
export const domesticQuantumAdmissions = {
  eligibility: [
    "B.Sc. with Mathematics as the main subject and any two of Physics, Chemistry, Statistics, Electronics or Computer Science.",
    "B.Tech. in CSE, IT or Electronics.",
    "Bachelor of Computer Applications (BCA).",
  ],
  recognition: "Qualifying degree from a university recognised by the University Grants Commission.",
  entrance: { format: "online", questions: 50, marks: 50, negativeMarking: false },
  selection: "Qualified/shortlisted candidates proceed to counselling and certificate verification through Directorate of Admissions (DOA), SVU.",
  spell: "As notified by SVU",
} as const;