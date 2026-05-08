import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../constants/socialLinks';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-ssgmce-dark-blue to-ssgmce-blue text-white mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 text-ssgmce-orange">About SSGMCE</h3>
            <p className="text-gray-300 text-xs leading-relaxed mb-3">
              Shri Sant Gajanan Maharaj College of Engineering is a premier engineering institution 
              in Maharashtra, affiliated to Sant Gadge Baba Amravati University and approved by AICTE.
            </p>
            <div className="flex gap-2">
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
                    className="w-8 h-8 bg-ssgmce-blue rounded-full flex items-center justify-center hover:bg-ssgmce-orange transition-colors duration-300"
                  >
                    <Icon className="text-sm" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 text-ssgmce-orange">Quick Links</h3>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/about" className="text-gray-300 hover:text-ssgmce-orange hover:pl-2 transition-all duration-200 inline-block">About Us</Link></li>
              <li><Link to="/admissions" className="text-gray-300 hover:text-ssgmce-orange hover:pl-2 transition-all duration-200 inline-block">Admissions</Link></li>
              <li><Link to="/departments" className="text-gray-300 hover:text-ssgmce-orange hover:pl-2 transition-all duration-200 inline-block">Departments</Link></li>
              <li><Link to="/placements" className="text-gray-300 hover:text-ssgmce-orange hover:pl-2 transition-all duration-200 inline-block">Placements</Link></li>
              <li><Link to="/research" className="text-gray-300 hover:text-ssgmce-orange hover:pl-2 transition-all duration-200 inline-block">Research</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-ssgmce-orange hover:pl-2 transition-all duration-200 inline-block">Contact Us</Link></li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 text-ssgmce-orange">Important Links</h3>
            <ul className="space-y-1.5 text-xs">
              <li><a href="https://sgbau.ac.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-ssgmce-orange hover:pl-2 transition-all duration-200 inline-block">SGBAU</a></li>
              <li><a href="https://aicte-india.org" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-ssgmce-orange hover:pl-2 transition-all duration-200 inline-block">AICTE</a></li>
              <li><a href="https://www.education.gov.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-ssgmce-orange hover:pl-2 transition-all duration-200 inline-block">MHRD</a></li>
              <li><a href="https://dte.maharashtra.gov.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-ssgmce-orange hover:pl-2 transition-all duration-200 inline-block">DTE Maharashtra</a></li>
              <li><Link to="/events" className="text-gray-300 hover:text-ssgmce-orange hover:pl-2 transition-all duration-200 inline-block">Events</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-ssgmce-orange hover:pl-2 transition-all duration-200 inline-block">Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 text-ssgmce-orange">Contact Info</h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-ssgmce-orange mt-0.5 flex-shrink-0 text-xs" />
                <span className="text-gray-300">Shegaon - 444203, Dist. Buldhana, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-ssgmce-orange flex-shrink-0 text-xs" />
                <span className="text-gray-300">+91-7265-252101</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-ssgmce-orange flex-shrink-0 text-xs" />
                <span className="text-gray-300">principal@ssgmce.ac.in</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-ssgmce-dark-blue border-t border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-1 text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} SSGMCE Shegaon. All Rights Reserved.</p>
            {/* <p>Designed & Developed with ❤️ by Gaurav</p> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
