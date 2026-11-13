import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/base/button";
import { SvuHeader } from "./components/svu-header";
import { SvuFooter } from "./components/svu-footer";
import { TechStrip } from "./components/tech-strip";
import internationalImage from "@/assets/svu-international-banner.png.asset.json";
import admissionsImage from "@/assets/svu-admissions.jpg.asset.json";

const eligibility = [
  "B.Tech. in CSE, IT, Electronics & Telecommunication Engineering, Electronics & Communication Engineering, or Electrical & Electronics Engineering.",
  "B.Sc. with Mathematics as the main subject and any two of Physics, Chemistry, Statistics, Electronics or Computer Science.",
  "Bachelor of Computer Applications (BCA).",
];

export default function StudentInformation({ international = false }: { international?: boolean }) {
  const title = international ? "International Students" : "Admissions";
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} | SVU Data Science & Exafluence Education`;
    return () => { document.title = "SVU Data Science Programmes in Tirupati | Exafluence"; };
  }, [title]);
  return <>
    <SvuHeader />
    <main className="landing">
      <section className="student-page-hero">
        <img src={(international ? internationalImage : admissionsImage).url} width={1920} height={800} alt={international ? "Data dashboards, charts and code on a deep navy background" : "Data science programme artwork from the official SVU website"} />
        <div className="student-page-hero-content">
          <p className="text-sm">Sri Venkateswara University · Exafluence Education</p>
          <h1 className="mt-3">{title}</h1>
          <p>{international ? "M.S. Data Science — university-led education with industry mentorship, practical learning and a global perspective." : "Explore the university’s admission routes for M.S. Data Science, the PG Diploma and specialist diplomas."}</p>
          <div className="mt-6 flex flex-wrap gap-3"><Button variant="secondary" asChild><Link to="/registration">Official registration</Link></Button><Button asChild><Link to="/#contact">Send an enquiry</Link></Button></div>
        </div>
      </section>
      <div className="student-page-content">
        <section><h2>{international ? "Academic eligibility & recognition" : "M.S. Data Science eligibility"}</h2><ul>{eligibility.map((item) => <li key={item}>{item}</li>)}</ul>
          {international && <p className="mt-4">International applicants must have earned their qualifying graduation degree from a foreign university or institution recognised as equivalent by the Association of Indian Universities (AIU), or a similar Indian government institution or body.</p>}
        </section>
        {!international && <section><h2>Diploma eligibility</h2><h3 className="mb-3">PG Diploma in Data Science</h3><p>Engineering graduates from all specialisations are eligible. Non-engineering graduates need at least one year of IT-domain experience, supported by valid proof such as an experience or appointment letter dated at least 12 months before application.</p><h3 className="mb-3 mt-6">Specialist diplomas</h3><p>All graduates are eligible, irrespective of discipline. Final-year Engineering and Honours students of SVU and affiliated colleges are included. Final-year applicants from institutions outside SVU’s jurisdiction must submit a valid No Objection Certificate from their college principal.</p></section>}
        <section><h2>Admission process</h2>
          {international ? <ul><li>Admission begins with a secure, proctored online Common Entrance Test. The multiple-choice questions follow PGCET syllabus guidelines.</li><li>Qualifying candidates proceed to the university’s Directorate of Admissions (DOA) for document verification, fee processing and final enrolment, according to university norms and timelines.</li></ul> : <><h3 className="mb-3">M.S. Data Science</h3><p>Admission routes include the Common Online Entrance Test through APPGCET, according to the official APPGCET schedule, and the Common Online Proctored Entrance Test conducted by the Directorate of Admissions, Sri Venkateswara University, Tirupati.</p><h3 className="mb-3 mt-6">PG Diploma & specialist diplomas</h3><p>Admission is granted to candidates who qualify in the entrance examination, subject to university DOA norms and procedures. All required, valid educational documents must be submitted during verification.</p></>}
        </section>
        {international ? <>
          <section><h2>Learning & programme structure</h2><p>The two-year, regular full-time M.S. programme combines offline and online delivery. The official learning model emphasises practical learning, theoretical foundations, online sessions, industry professionals and mentors, and LMS resources available 24/7.</p><p className="mt-3">A final-semester capstone project applies the learning to real-world business challenges, supported by Exafluence industry experts, case studies and real-time projects.</p><TechStrip compact /></section>
          <section><h2>Assessments & examinations</h2><ul><li>Internal assessments are conducted in a proctored online format and follow university-regulated assessment requirements.</li><li>Semester-end examinations are primarily held offline at the university campus.</li><li>Where significant numbers of students live in the same region or city, the official site notes that examinations may be held at a nearby state-owned university, subject to university arrangements.</li></ul></section>
          <section><h2>Travel & student support</h2><p>Students need to plan travel to India for semester-end examinations. Exafluence Inc. provides travel assistance and accommodation coordination; additional costs apply.</p></section>
          <section><h2>Qualifications & certificates</h2><p>The university awards the postgraduate qualification on successful completion. Exafluence Inc., USA issues skill and participation certificates for hands-on experience, industry exposure, workshops, projects and technical training.</p></section>
        </> : <>
          <section><h2>Schedules & official announcements</h2><p>Entrance-test dates, document-verification deadlines and enrolment instructions must be checked against current university and APPGCET announcements. The homepage’s dates are expected windows, not confirmed deadlines.</p><div className="mt-5 flex flex-wrap gap-3"><Button variant="outline" asChild><a href="https://svuniversity.edu.in/doa/">University Directorate of Admissions</a></Button><Button variant="outline" asChild><Link to="/registration">Official programme registration</Link></Button></div></section>
          <section><h2>Programme funding</h2><p>The official website identifies the collaborative Data Science programmes as self-supporting programmes and states that government scholarships are not applicable.</p></section>
          <section><h2>Applying from outside India?</h2><p>Review degree-equivalence requirements, the international entrance process and semester-end examination arrangements.</p><Button asChild className="mt-4"><Link to="/international-students">International student admissions</Link></Button></section>
        </>}
        <section><h2>Enquiries</h2><p>Contact admissions at <a href="mailto:admissions@svudatascience.in" className="text-primary hover:underline">admissions@svudatascience.in</a>.</p><Button asChild className="mt-4"><Link to="/registration">Registration form</Link></Button><p className="mt-6 text-sm">Source: <a href={`https://svudatascience.in/${international ? "#internationStudents" : ""}`} className="text-primary hover:underline">Official SVU Data Science website</a></p></section>
      </div>
    </main>
    <SvuFooter />
  </>;
}