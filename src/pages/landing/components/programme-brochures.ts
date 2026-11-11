import { unlockedBrochureIds, type BrochureId } from "./brochure-unlock";
import msBrochure from "@/assets/brochure-MS_Data_Science_Brochure.pptx.asset.json";
import pgBrochure from "@/assets/brochure-PG_Diploma_Data_Science.pptx.asset.json";
import diplomaBrochure from "@/assets/brochure-Specialist_Diplomas.pptx.asset.json";

export const brochures = [
  { id: "ms" as BrochureId, title: "M.S. Data\u00A0Science", note: "Two-year Master's programme", file: msBrochure },
  { id: "pg" as BrochureId, title: "PG Diploma in Data\u00A0Science", note: "One-year postgraduate diploma", file: pgBrochure },
  { id: "specialist" as BrochureId, title: "Specialist Diplomas", note: "Python for AI, ML & Generative AI, Data Visualization, Cloud Technologies", file: diplomaBrochure },
];

export function brochureForProgramme(programme: string) {
  const [id] = unlockedBrochureIds([programme]);
  return brochures.find((brochure) => brochure.id === id);
}