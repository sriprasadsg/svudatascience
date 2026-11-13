import { useEffect } from "react";
import { SvuHeader } from "./components/svu-header";
import { SvuFooter } from "./components/svu-footer";
import { RegisterInterest } from "./components/register-interest";

export default function RegistrationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Registration | SVU Data Science & Exafluence Education";
    return () => { document.title = "SVU Data Science Programmes in Tirupati | Exafluence"; };
  }, []);

  return <>
    <SvuHeader />
    <main className="landing mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-center">Registration form</h1>
      <RegisterInterest />
    </main>
    <SvuFooter />
  </>;
}