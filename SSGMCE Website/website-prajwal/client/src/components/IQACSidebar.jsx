import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';
import { useEdit } from '../contexts/EditContext';

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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center">
        <span className="w-1.5 h-6 bg-ssgmce-orange rounded-full mr-2"></span>
        <FaClipboardList className="text-ssgmce-blue mr-2" />
        IQAC
      </h3>
      <ul className="space-y-1">
        {links.map((link) => {
          const isActive = location.pathname === link.path ||
            (isEditing && location.pathname === `/admin/visual/${pathToPageId(link.path)}`);
          return (
            <li key={link.path}>
              <Link
                to={isEditing ? `/admin/visual/${pathToPageId(link.path)}` : link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`block px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${isActive
                  ? 'bg-ssgmce-blue text-white shadow-md transform translate-x-1'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-ssgmce-blue'
                }`}
              >
                {link.name}
              </Link>

              {isActive && sections && sections.length > 0 && (
                <ul className="mt-1 mb-2 ml-4 pl-3 border-l-2 border-blue-200 space-y-1">
                  {sections
                    .filter(s => s.title && s.title !== 'Intro')
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                      <li key={section.sectionId}>
                        <a
                          href={`#${section.sectionId}`}
                          onClick={(e) => handleScroll(e, section.sectionId)}
                          className="block px-3 py-1.5 text-xs text-gray-500 hover:text-ssgmce-blue hover:bg-blue-50 rounded transition-colors"
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
    </div>
  );
};

export default IQACSidebar;
