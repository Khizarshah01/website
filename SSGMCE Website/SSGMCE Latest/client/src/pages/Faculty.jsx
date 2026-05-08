import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  FaArrowRight,
  FaEnvelope,
  FaExternalLinkAlt,
  FaPhone,
  FaUserTie,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import {
  DEPARTMENT_MAP,
  FACULTY_DIRECTORY_DEPARTMENTS,
  getVidwanUrl,
  useFacultyDirectoryData,
} from "./FacultyDetail";
import { getCurrentPath } from "../utils/navigation";

const Faculty = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [selectedDept, setSelectedDept] = useState(
    searchParams.get("dept") || "all",
  );
  const { facultyDirectory, loading } = useFacultyDirectoryData();

  useEffect(() => {
    setSelectedDept(searchParams.get("dept") || "all");
  }, [searchParams]);

  const filteredFaculty =
    selectedDept === "all"
      ? facultyDirectory
      : facultyDirectory.filter((faculty) => faculty.department === selectedDept);

  return (
    <div className="animation-fade-in">
      <PageHeader
        title="Our Faculty"
        subtitle="Faculty profiles from all departments, using the same institute directory data"
      />

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-lg leading-relaxed text-gray-700">
              Browse faculty members from every department with the same details
              available on their individual department pages, including
              designation, specialization, contact information, and detailed
              profile pages.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {FACULTY_DIRECTORY_DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => {
                  setSelectedDept(dept.id);
                  const nextParams = new URLSearchParams(searchParams);
                  if (dept.id === "all") {
                    nextParams.delete("dept");
                  } else {
                    nextParams.set("dept", dept.id);
                  }
                  setSearchParams(nextParams);
                }}
                className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 ${
                  selectedDept === dept.id
                    ? "scale-105 bg-ssgmce-blue text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 pt-8">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="py-12 text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-ssgmce-blue"></div>
              <p className="mt-4 text-gray-600">Loading faculty data...</p>
            </div>
          ) : (
            <div className="grid gap-6 xl:grid-cols-2">
              {filteredFaculty.map((faculty) => (
                <article
                  key={faculty.id}
                  className="group relative flex overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative w-32 flex-shrink-0 overflow-hidden border-r border-gray-100 bg-gray-50 sm:w-40">
                    {faculty.photo ? (
                      <img
                        src={faculty.photo}
                        alt={faculty.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ssgmce-blue to-ssgmce-dark-blue">
                        <FaUserTie className="text-4xl text-white/80" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                      {DEPARTMENT_MAP[faculty.department] || faculty.department}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-ssgmce-blue">
                      {faculty.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-ssgmce-blue">
                      {faculty.role || faculty.designation}
                    </p>

                    <div className="mt-3 space-y-2 text-sm text-gray-600">
                      {faculty.area?.length ? (
                        <div className="line-clamp-2 text-xs">
                          <span className="font-bold text-gray-700">Area: </span>
                          {faculty.area.join(", ")}
                        </div>
                      ) : null}
                      {faculty.qualification ? (
                        <div className="line-clamp-2 text-xs">
                          <span className="font-bold text-gray-700">
                            Qualification:{" "}
                          </span>
                          {faculty.qualification}
                        </div>
                      ) : null}
                      {faculty.experience ? (
                        <div className="line-clamp-2 text-xs">
                          <span className="font-bold text-gray-700">
                            Experience:{" "}
                          </span>
                          {faculty.experience}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col gap-1 pt-3">
                      {faculty.email ? (
                        <span className="flex items-center truncate text-xs transition-colors hover:text-ssgmce-blue">
                          <FaEnvelope className="mr-2 flex-shrink-0 text-gray-400" />
                          {faculty.email}
                        </span>
                      ) : null}
                      {faculty.phone ? (
                        <span className="flex items-center text-xs">
                          <FaPhone className="mr-2 flex-shrink-0 text-gray-400" />
                          {faculty.phone}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-3">
                      {getVidwanUrl(faculty) ? (
                        <a
                          href={getVidwanUrl(faculty)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[10px] font-bold uppercase tracking-wide text-emerald-600 hover:underline"
                        >
                          Vidwan Profile <FaExternalLinkAlt className="ml-1" />
                        </a>
                      ) : null}
                      {!faculty.isIndustry ? (
                        <Link
                          to={`/faculty/${faculty.id}`}
                          state={{ from: getCurrentPath(location) }}
                          className="inline-flex items-center text-[10px] font-bold uppercase tracking-wide text-ssgmce-blue hover:underline"
                        >
                          View Profile <FaArrowRight className="ml-1" />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && filteredFaculty.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-xl text-gray-600">
                No faculty members found for this department.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Faculty;
