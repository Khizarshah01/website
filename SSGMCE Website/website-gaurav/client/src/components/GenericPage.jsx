import React from 'react';
import PageHeader from './PageHeader';
import { motion } from 'framer-motion';

const GenericPage = ({
  title,
  children,
  backgroundImage,
  sidebar,
  variant = 'default',
  showInnerTitle = true,
  contentClassName,
}) => {
  const isAboutVariant = variant === 'about';

  return (
    <>
      <PageHeader title={title} path={title} backgroundImage={backgroundImage} />
      <div
        className={`container mx-auto px-4 ${isAboutVariant ? 'py-8 md:py-12' : 'py-8 md:py-12'}`}
      >
        <div className={sidebar ? 'flex flex-col lg:flex-row gap-8' : ''}>
          {sidebar && (
            <aside className="lg:w-72 flex-shrink-0">
              {sidebar}
            </aside>
          )}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className={`flex-1 min-h-[400px] ${
               isAboutVariant
                 ? 'rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 md:p-8 shadow-[0_10px_28px_rgba(15,23,42,0.08)]'
                 : 'bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 border border-gray-100'
             }`}
          >
              {showInnerTitle && (
                <h2
                  className={
                    isAboutVariant
                      ? 'text-2xl md:text-3xl font-semibold text-slate-900 mb-8 border-b border-slate-200 pb-3'
                      : 'text-2xl font-bold text-ssgmce-blue mb-6 border-b-2 border-ssgmce-orange inline-block pb-2'
                  }
                >
                    {title}
                </h2>
              )}
              <div
                className={
                  contentClassName ||
                  (isAboutVariant
                    ? 'max-w-none text-slate-700'
                    : 'prose max-w-none text-gray-700')
                }
              >
                  {children}
              </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default GenericPage;
