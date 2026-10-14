import { useEffect } from "react";
import type { ComponentType } from "react";
import { IconArrowUp, IconBrandFacebookFilled, IconBrandLinkedinFilled, IconBrandInstagram, IconBrandYoutubeFilled, IconMapPinFilled, IconPhoneFilled, IconMailFilled } from "@tabler/icons-react";
import { Button } from "@/components/base/button";
import indiaLogo from "@/assets/svu-indiagov.png.asset.json";
import apLogo from "@/assets/svu-andhra-pradesh.png.asset.json";
import ministryLogo from "@/assets/svu-mhrd.png.asset.json";
import decoration from "@/assets/svu-footer-decoration.png.asset.json";

const columns = [
  { title: "About Us", links: [["Overview", "about/"], ["Vision & Mission", "vision-mission/"], ["Our Predecessors", "our-predecessors"], ["Act & Ordinance", "svuniversity-act-ordinance/"]] },
  { title: "Administration", links: [["Vice Chancellor", "vice-chancellor/"], ["Rector", "rector/"], ["Registrar", "registrar/"], ["Executive Council", "executive-council/"], ["Academic Senate", "academic-senate/"], ["Officers of SVU", "officers/"]] },
  { title: "Resources", links: [["Sports & Games", "sports-games/"], ["SVU Health Centre", "health-center-at-svu/"], ["Exams Results", "exams-results/"], ["Internet Facility", "internet-facility/"], ["Committees", "committees-cell-bodies"], ["MoU's", "mous/"]] },
  { title: "Important Links", links: [["Academic Calendar", "storage/2022/10/academic-calendar.pdf"], ["Notifications", "notifications/"], ["Campus Tour", "campus-tour"], ["Privacy Policy", "privacy-ploicy/"], ["Terms & Conditions", "terms-conditions/"], ["Copyright Policy", "copyright-policy/"]] },
];

function EnquiryChip({ icon: Icon }: { icon: ComponentType<{ size?: number | string }> }) {
  return (
    <span className="svu-enquiries-chip" aria-hidden="true">
      <Icon size={16} />
    </span>
  );
}

export function SvuFooter() {
  useEffect(() => {
    const id = "svu-footer-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <footer id="contact" className="svu-official-footer">
      <div className="svu-enquiries">
        <div className="svu-enquiries-inner">
          <div className="svu-admissions-contact">
            <h4>Admissions &amp; enquiries</h4>
            <a className="svu-enquiries-email" href="mailto:admissions@svudatascience.in">
              <EnquiryChip icon={IconMailFilled} />
              <span>admissions@svudatascience.in</span>
            </a>
          </div>
          <div className="svu-enquiries-address">
            <span className="svu-enquiries-label">
              <EnquiryChip icon={IconMapPinFilled} />
              Visit us
            </span>
            <h4>Exafluence Education Centre</h4>
            <address>Next to Centre for Distance &amp; Online Education<br />SV University Campus<br />Tirupati – 517502</address>
          </div>
          <div className="svu-enquiries-numbers">
            <span className="svu-enquiries-label">
              <EnquiryChip icon={IconPhoneFilled} />
              Call us
            </span>
            <a className="svu-enquiries-landline" href="tel:08772248094">0877 - 2248094</a>
            <span className="svu-enquiries-number-label">Mobile</span>
            <a href="tel:+917396866627">+91 7396866627</a>
            <a href="tel:+917396866628">+91 7396866628</a>
          </div>
        </div>
      </div>
      <div className="svu-footer-band">
        <div className="svu-footer-main">
          <div className="svu-footer-columns">
            {columns.map((column) => (
              <div key={column.title}>
                <h5>{column.title}</h5>
                <ul className="svu-footer-links">
                  {column.links.map(([label, path]) => (
                    <li key={label}><a href={`https://svuniversity.edu.in/${path}`}>{label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="svu-university-contact">
              <h5>Contact Us</h5>
              <address>
                <p className="svu-campus-address"><IconMapPinFilled size={16} aria-hidden="true" />Sri Venkateswara University, Tirupati, Andhra Pradesh - 517502</p>
                <div className="svu-map-row"><Button asChild className="svu-map-button"><a href="https://goo.gl/maps/wrdsiNe4me6xYdzdA" target="_blank" rel="noopener noreferrer">View On Map</a></Button></div>
                <ul className="svu-contact-links">
                  <li><IconPhoneFilled size={15} aria-hidden="true" /><a href="tel:+918772289545">+91 (877) 2289545</a></li>
                  {[0, 1].map((i) => <li key={i}><IconMailFilled size={15} aria-hidden="true" /><a href="mailto:registrarsvu@gmail.com">registrarsvu@gmail.com</a></li>)}
                </ul>
                <p className="svu-verification">For<br />Genuineness Verification of Diplomas, mail to <a href="mailto:verify@svumail.edu.in">verify@svumail.edu.in.</a></p>
              </address>
              <div className="svu-socials" aria-label="University social media">
                {[{ label: "Facebook", Icon: IconBrandFacebookFilled, className: "svu-facebook" }, { label: "LinkedIn", Icon: IconBrandLinkedinFilled, className: "svu-linkedin" }, { label: "Instagram", Icon: IconBrandInstagram, className: "svu-instagram" }, { label: "YouTube", Icon: IconBrandYoutubeFilled, className: "svu-youtube" }].map(({ label, Icon, className }) => (
                  <Button asChild key={label} className={`svu-social-button ${className}`}><a href="#!" aria-label={label} title={label}><Icon size={16} aria-hidden="true" /></a></Button>
                ))}
              </div>
            </div>
          </div>
          <div className="svu-government-logos">
            <img src={indiaLogo.url} alt="india.gov.in — National Portal of India" width={327} height={100} />
            <img src={apLogo.url} alt="Government of Andhra Pradesh" width={256} height={100} />
            <img src={ministryLogo.url} alt="MHRD — Department of Higher Education, Government of India" width={599} height={100} />
          </div>
        </div>
        <img className="svu-footer-decoration" src={decoration.url} alt="" aria-hidden="true" />
      </div>
      <Button className="svu-back-to-top" size="icon" aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}><IconArrowUp size={20} /></Button>
    </footer>
  );
}
