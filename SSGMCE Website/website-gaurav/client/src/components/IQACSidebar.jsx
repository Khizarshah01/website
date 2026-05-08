import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';
import { useEdit } from '../contexts/EditContext';
import MobileSidebarToggle from './MobileSidebarToggle';

const links = [
  { name: 'Vision & Mission', path: '/iqac/vision' },
  { name: 'Composition & Function', path: '/iqac/composition' },
  { name: 'Minutes of Meeting', path: '/iqac/minutes' },
  { name: 'Best Practices', path: '/iqac/practices' },
  { name: 'Institutional Distinctiveness', path: '/iqac/distinctiveness' },
  { name: 'AQAR Reports', path: '/iqac/aqar' },
  { name: 'NAAC-SSR 3rd Cycle', path: '/iqac/naac' },
  { name: 'e-Content', path: '/iqac/econtent' },
  { name: 'e-Content Facility', path: '/iqac/econtent-facility' },
  { name: 'Feedback Report', path: '/iqac/feedback' },
  { name: 'Feedback Analysis', path: '/iqac/analysis' },
  { name: 'Student Survey Report', path: '/iqac/survey' },
  { name: 'Gender Sensitization Plan', path: '/iqac/gender' },
  { name: 'Gender Equity', path: '/iqac/equity' },
];

const pathToPageId = (path) => path.replace(/^\//, '').replace(/\//g, '-');

const IQACSidebar = ({ sections }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isEditing } = useEdit();

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e, path) => {
    if (isEditing) {
      e.preventDefault();
      navigate(`/admin/visual/${pathToPageId(path)}`);
    }
  };

  const navContent = (
    <nav>
      <ul className="space-y-1">
        {links.map((link) => {
          const isActive = location.pathname === link.path ||
            (isEditing && location.pathname === `/admin/visual/${pathToPageId(link.path)}`);
          return (
            <li key={link.path}>
              <Link
                to={isEditing ? `/admin/visual/${pathToPageId(link.path)}` : link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive
                  ? 'bg-ssgmce-blue/10 font-semibold text-ssgmce-blue'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>

              {isActive && sections && sections.length > 0 && (
                <ul className="mt-1 mb-2 ml-4 space-y-1 border-l-2 border-blue-200 pl-3">
                  {sections
                    .filter(s => s.title && s.title !== 'Intro')
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                      <li key={section.sectionId}>
                        <a
                          href={`#${section.sectionId}`}
                          onClick={(e) => handleScroll(e, section.sectionId)}
                          className="block rounded px-3 py-1.5 text-xs text-gray-500 transition-colors hover:bg-blue-50 hover:text-ssgmce-blue"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      <MobileSidebarToggle title="IQAC" icon={FaClipboardList}>
        {navContent}
      </MobileSidebarToggle>

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
        <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
          <h3 className="flex items-center text-lg font-bold text-white">
            <FaClipboardList className="mr-2" /> IQAC
          </h3>
        </div>

        <div className="p-3">{navContent}</div>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-gray-500">Need Help?</p>
          <p className="text-xs text-ssgmce-blue">+91-7265-252274</p>
          <p className="text-xs text-ssgmce-blue">iqac@ssgmce.ac.in</p>
        </div>
      </div>
    </>
  );
};

export default IQACSidebar;
