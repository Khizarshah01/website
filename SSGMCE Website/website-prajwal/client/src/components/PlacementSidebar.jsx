import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEdit } from '../contexts/EditContext';
import MobileSidebarToggle from './MobileSidebarToggle';

const links = [
  { name: 'Placement Brochure', path: '/placements/brochure' },
  { name: 'About Training & Placement Cell', path: '/placements/about' },
  { name: 'Objectives Rules & Procedures', path: '/placements/objectives' },
  { name: 'T&P Goals', path: '/placements/goals' },
  { name: 'Placement Cell Coordinators', path: '/placements/coordinators' },
  { name: 'Placement Statistics', path: '/placements/statistics' },
  { name: 'Training & Placement Activities', path: '/placements/activities' },
  { name: 'Major Recruiters', path: '/placements/recruiters' },
  { name: 'Career Guidance Cell', path: '/placements/career' },
  { name: 'Internship', path: '/placements/internship' },
  { name: 'Contact Us', path: '/placements/contact' },
];

/** Convert a public path to a pageId slug: /placements/about → placements-about */
const pathToPageId = (path) => path.replace(/^\//, '').replace(/\//g, '-');

const PlacementSidebar = ({ sections }) => {
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
  );

  return (
    <>
      <MobileSidebarToggle title="Placement Links">
        {navContent}
      </MobileSidebarToggle>
      <div className="hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:block">
      <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center">
        <span className="w-1.5 h-6 bg-ssgmce-orange rounded-full mr-2"></span>
        Quick Links
      </h3>
      {navContent}
    </div>
    </>
  );
};

export default PlacementSidebar;
