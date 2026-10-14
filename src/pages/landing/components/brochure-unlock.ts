// Which brochure card a contact-form programme unlocks. A card opens only when
// the submitted enquiry is for that programme — submitting one programme never
// opens the others.
export type BrochureId = "ms" | "pg" | "specialist";

export const brochureUnlockRules: Record<BrochureId, (programme: string) => boolean> = {
  ms: (programme) => programme.startsWith("M.S."),
  pg: (programme) => programme.startsWith("PG Diploma"),
  specialist: (programme) => programme.startsWith("Specialist Diploma"),
};

export function unlockedBrochureIds(submittedProgrammes: string[]): BrochureId[] {
  return (Object.keys(brochureUnlockRules) as BrochureId[]).filter((id) =>
    submittedProgrammes.some((p) => brochureUnlockRules[id](p)),
  );
}
