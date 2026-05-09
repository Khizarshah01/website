import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaFlask } from "react-icons/fa";

const DepartmentRedirectGrid = ({
  title = "Explore Publications by Department",
  subtitle = "Jump directly to the publication section for any department.",
  departments = [],
  currentPath = "",
}) => {
  if (!departments.length) return null;

  return (
    <section className="space-y-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-blue-50/40 to-orange-50/50 p-6 shadow-sm">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-ssgmce-blue shadow-sm ring-1 ring-blue-100">
          <FaFlask className="text-lg" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {departments.map((department) => {
          const isCurrent = currentPath === department.path;

          return (
            <Link
              key={department.id}
              to={department.path}
              className={`group flex min-h-[184px] flex-col rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ssgmce-blue/30 ${
                isCurrent
                  ? "border-ssgmce-blue shadow-md ring-1 ring-ssgmce-blue/10"
                  : "border-gray-200 hover:border-blue-200"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ssgmce-blue">
                  Department
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    isCurrent
                      ? "bg-ssgmce-blue text-white"
                      : "bg-orange-50 text-ssgmce-orange"
                  }`}
                >
                  Publications
                </span>
              </div>

              <h4 className="text-lg font-bold leading-snug text-gray-900">
                {department.title}
              </h4>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                {department.description}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ssgmce-blue transition-colors group-hover:text-blue-800">
                {department.cta}
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default DepartmentRedirectGrid;
