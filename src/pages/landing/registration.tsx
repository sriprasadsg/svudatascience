import { useEffect } from "react";
import registrationPdf from "@/assets/svu-registration-fillable.pdf.asset.json";

export default function RegistrationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Registration | SVU Data Science & Exafluence Education";
    return () => { document.title = "SVU Data Science Programmes in Tirupati | Exafluence"; };
  }, []);

  return <iframe
    src={`${registrationPdf.url}#view=FitH`}
    title="SVU fillable registration form"
    className="fixed inset-0 h-dvh w-full border-0 bg-background"
  />;
}