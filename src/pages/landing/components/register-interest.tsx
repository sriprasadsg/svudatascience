import { Button } from "@/components/base/button";
import { IconDownload, IconExternalLink, IconMail } from "@tabler/icons-react";
import registrationPdf from "@/assets/svu-registration-fillable.pdf.asset.json";
import registrationPreview from "@/assets/svu-registration-preview.jpg.asset.json";
export { programmeOptions } from "./registration-validation";

export function RegisterInterest() {
  return (
    <div className="mt-6 min-w-0">
      <div className="mb-4 flex flex-wrap gap-3">
        <Button asChild><a href={registrationPdf.url} target="_blank" rel="noopener noreferrer"><IconExternalLink className="size-4" /> Open registration PDF</a></Button>
        <Button variant="outline" asChild><a href={registrationPdf.url} download="SVU_Registration_Form_Fillable_v2.pdf"><IconDownload className="size-4" /> Download form</a></Button>
        <Button variant="outline" asChild><a href="mailto:admissions@svudatascience.in?subject=SVU%20Registration%20Form"><IconMail className="size-4" /> Email admissions</a></Button>
      </div>
      <a href={registrationPdf.url} target="_blank" rel="noopener noreferrer" aria-label="Open SVU fillable registration form" className="block rounded-md border border-border bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
        <img src={registrationPreview.url} alt="SVU registration form for AY 2027–2028 admissions" width={1132} height={1600} className="h-auto w-full rounded-md" />
      </a>
    </div>
  );
}
