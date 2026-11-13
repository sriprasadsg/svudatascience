import registrationPdf from "@/assets/svu-registration-fillable.pdf.asset.json";
import registrationPreview from "@/assets/svu-registration-preview.jpg.asset.json";
export { programmeOptions } from "./registration-validation";

export function RegisterInterest() {
  return (
    <div className="mt-6 min-w-0">
      <a href={registrationPdf.url} target="_blank" rel="noopener noreferrer" aria-label="Open SVU fillable registration form" className="block rounded-md border border-border bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
        <img src={registrationPreview.url} alt="SVU registration form for AY 2027–2028 admissions" width={1132} height={1600} className="h-auto w-full rounded-md" />
      </a>
    </div>
  );
}
