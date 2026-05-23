import defaultHeaderBackground from "../assets/images/navbar/about.jpg";
import academicsHeaderBackground from "../assets/images/navbar/Academics.JPG";
import activitiesHeaderBackground from "../assets/images/navbar/activities.png";
import admissionsHeaderBackground from "../assets/images/navbar/admissions.jpg";
import documentsHeaderBackground from "../assets/images/navbar/documents.jpg";
import facilitiesHeaderBackground from "../assets/images/home/Main-Gate.jpeg";
import iqacHeaderBackground from "../assets/images/navbar/IQAC.png";
import nirfHeaderBackground from "../assets/images/navbar/nirf.png";
import placementsHeaderBackground from "../assets/images/navbar/placements.png";
import researchHeaderBackground from "../assets/images/navbar/research.jpg";
import cseHeaderBackground from "../assets/images/departments/cse/Cse banner.png";
import itHeaderBackground from "../assets/images/departments/it/IT banner.png";
import mechanicalHeaderBackground from "../assets/images/departments/mechanical/Mechnical banner.png";
import electricalHeaderBackground from "../assets/images/departments/electrical/Electrical Banner.png";
import electronicsHeaderBackground from "../assets/images/departments/electronics/Electronics Banner.png";
import appliedSciencesHeaderBackground from "../assets/images/departments/applied-sciences/banner.png";
import mbaHeaderBackground from "../assets/images/departments/mba/MBA banner.png";

const HEADER_IMAGE_RULES = [
  { test: /computer science|cse|software/i, image: cseHeaderBackground },
  { test: /information technology|\bit\b/i, image: itHeaderBackground },
  { test: /mechanical/i, image: mechanicalHeaderBackground },
  { test: /electrical/i, image: electricalHeaderBackground },
  { test: /electronics|entc|entertainment and communication|telecommunication/i, image: electronicsHeaderBackground },
  { test: /applied sciences|science|basic sciences|ash/i, image: appliedSciencesHeaderBackground },
  { test: /mba|management/i, image: mbaHeaderBackground },
  { test: /academics?|course|syllabus|timetable|planner|teaching|rules|marks|rubrics|notice/i, image: academicsHeaderBackground },
  { test: /activity|event|chapter|nss|ieee|iste|mesa|essa|csesa|itsa|cultural|innovo/i, image: activitiesHeaderBackground },
  { test: /admission|fee structure|fees|brochure|seat matrix|documents required|scholarship|faq/i, image: admissionsHeaderBackground },
  { test: /document|naac|nba|iso|mandatory|aicte|policy|financial|newsletter|tattwadarshi/i, image: documentsHeaderBackground },
  { test: /facility|facilities|library|hostel|sports|computing|laborator/i, image: facilitiesHeaderBackground },
  { test: /iqac|quality|feedback|aqar|naac-ssr|gender|equity|e-content/i, image: iqacHeaderBackground },
  { test: /nirf|ranking/i, image: nirfHeaderBackground },
  { test: /placement|recruiter|alumni|internship|career|training/i, image: placementsHeaderBackground },
  { test: /research|innovation|patent|publication|ipr|project|phd|coe|collaboration/i, image: researchHeaderBackground },
];

const pickHeaderBackground = (title = "") => {
  const normalizedTitle = String(title || "").toLowerCase();
  const match = HEADER_IMAGE_RULES.find((rule) => rule.test.test(normalizedTitle));
  return match?.image || defaultHeaderBackground;
};

const PageHeader = ({ title, subtitle, backgroundImage }) => {
  const resolvedBackgroundImage = backgroundImage || pickHeaderBackground(title);

  return (
    <div
      className="relative overflow-hidden py-16 text-center text-white md:py-20"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.82), rgba(30, 58, 138, 0.82)), url(${resolvedBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-ssgmce-dark-blue/75 via-transparent to-ssgmce-dark-blue/75" />
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-2xl font-bold mb-3 text-shadow md:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="text-base md:text-lg text-ssgmce-light-blue">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
