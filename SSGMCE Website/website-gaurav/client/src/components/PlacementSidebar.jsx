import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';
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
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive
                ? 'bg-ssgmce-blue/10 font-semibold text-ssgmce-blue'
                : 'text-gray-700 hover:bg-gray-100'
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
  );

  return (
    <>
      <MobileSidebarToggle title="Placements" icon={FaBriefcase}>
        {navContent}
      </MobileSidebarToggle>

      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24 lg:block">
        <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-4">
          <h3 className="flex items-center text-lg font-bold text-white">
            <FaBriefcase className="mr-2" /> Placements
          </h3>
        </div>

        <div className="p-3">{navContent}</div>

        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-gray-500">Need Help?</p>
          <p className="text-xs text-ssgmce-blue">+91-7265-252274</p>
          <p className="text-xs text-ssgmce-blue">placements@ssgmce.ac.in</p>
        </div>
      </div>
    </>
  );
};

export default PlacementSidebar;
