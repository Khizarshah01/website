import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../constants/socialLinks';
import logo from '../assets/images/common/logo.png';

const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Admissions', to: '/admissions/brochure' },
  { label: 'Departments', to: '/departments' },
  { label: 'Placements', to: '/placements/brochure' },
  { label: 'Research', to: '/research/rdc' },
  { label: 'Contact Us', to: '/contact' },
];

const importantLinks = [
  { label: 'SGBAU', href: 'https://sgbau.ac.in' },
  { label: 'AICTE', href: 'https://aicte-india.org' },
  { label: 'MHRD', href: 'https://www.education.gov.in' },
  { label: 'DTE Maharashtra', href: 'https://dte.maharashtra.gov.in' },
  { label: 'Events', to: '/events' },
  { label: 'Photo Gallery', to: '/gallery' },
];

const sectionClass =
  'rounded-[26px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_22px_50px_rgba(7,18,37,0.22)] backdrop-blur-md';

const headingClass = 'mb-4 text-base font-bold tracking-[0.01em] text-ssgmce-orange md:text-lg';

const linkClass =
  'group inline-flex items-center text-[15px] text-slate-100/90 transition-all duration-200 hover:text-white';

const Footer = () => {
  return (
    <footer className="mt-auto overflow-hidden bg-[linear-gradient(180deg,#143154_0%,#112744_52%,#0a1d34_100%)] text-white">
      <div className="border-b border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-white/65 sm:text-left">
            Shri Sant Gajanan Maharaj College of Engineering, Shegaon
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          <div className={`${sectionClass} relative overflow-hidden lg:col-span-5`}>
            <div className="relative">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white px-2 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.18)]">
                    <img src={logo} alt="SSGMCE" className="h-14 w-auto object-contain" />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                      About SSGMCE
                    </p>
                    <h3 className="mt-1 text-xl font-bold leading-tight text-white md:text-2xl">
                      Engineering education with institutional depth
                    </h3>
                  </div>
                </div>

                <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                  Since 1983
                </span>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-100/85">
                Shri Sant Gajanan Maharaj College of Engineering is a premier engineering institution
                in Maharashtra, affiliated to Sant Gadge Baba Amravati University and approved by AICTE.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      title={item.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-ssgmce-orange hover:bg-ssgmce-orange"
                    >
                      <Icon className="text-sm" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={`${sectionClass} lg:col-span-2`}>
            <h3 className={headingClass}>Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    <span className="mr-2 text-sm font-semibold text-ssgmce-orange transition-transform duration-200 group-hover:translate-x-0.5">
                      &gt;
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${sectionClass} lg:col-span-2`}>
            <h3 className={headingClass}>Important Links</h3>
            <ul className="space-y-3">
              {importantLinks.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <span className="mr-2 text-sm font-semibold text-ssgmce-orange transition-transform duration-200 group-hover:translate-x-0.5">
                        &gt;
                      </span>
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <Link to={item.to} className={linkClass}>
                      <span className="mr-2 text-sm font-semibold text-ssgmce-orange transition-transform duration-200 group-hover:translate-x-0.5">
                        &gt;
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${sectionClass} lg:col-span-3`}>
            <h3 className={headingClass}>Contact Info</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3.5">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-sm text-ssgmce-orange" />
                  <span className="leading-6 text-slate-100/88">
                    Shegaon - 444203, Dist. Buldhana, Maharashtra, India
                  </span>
                </div>
              </li>

              <li className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <FaPhone className="flex-shrink-0 text-sm text-ssgmce-orange" />
                  <a href="tel:+917265252101" className="text-slate-100/88 transition-colors hover:text-white">
                    +91-7265-252101
                  </a>
                </div>
              </li>

              <li className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="flex-shrink-0 text-sm text-ssgmce-orange" />
                  <a
                    href="mailto:principal@ssgmce.ac.in"
                    className="break-all text-slate-100/88 transition-colors hover:text-white"
                  >
                    principal@ssgmce.ac.in
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/15">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center justify-between gap-2 text-center text-xs text-slate-300 md:flex-row md:text-left">
            <p>&copy; {new Date().getFullYear()} SSGMCE Shegaon. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
