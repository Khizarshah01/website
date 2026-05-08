import React from "react";
import FacilitiesSidebar from "../components/FacilitiesSidebar";

const Facilities = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 text-sm text-blue-200">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-white">Facilities</span>
          </nav>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Campus Facilities</h1>
          <p className="mt-4 text-lg text-blue-100 md:text-xl">
            Discover our state-of-the-art infrastructure and comprehensive facilities designed for excellence
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-80 lg:shrink-0">
            <FacilitiesSidebar />
          </aside>

          {/* Content */}
          <main className="flex-1">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              {/* Introduction */}
              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                  World-Class Campus Facilities
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  SSGMCE provides comprehensive infrastructure and facilities to support academic excellence,
                  research innovation, and holistic student development. Our campus features modern amenities
                  designed to create an optimal learning environment.
                </p>
              </section>

              {/* Facilities Overview */}
              <section className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  Facilities Overview
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                    <div className="mb-3 text-2xl">📚</div>
                    <h3 className="mb-2 text-lg font-semibold text-blue-900">Central Library</h3>
                    <p className="text-sm text-blue-800">
                      Modern library with vast collection of books, digital resources, and e-learning platforms
                    </p>
                  </div>

                  <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                    <div className="mb-3 text-2xl">🏨</div>
                    <h3 className="mb-2 text-lg font-semibold text-green-900">Hostels</h3>
                    <p className="text-sm text-green-800">
                      Comfortable accommodation facilities with modern amenities for outstation students
                    </p>
                  </div>

                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
                    <div className="mb-3 text-2xl">🏃‍♂️</div>
                    <h3 className="mb-2 text-lg font-semibold text-orange-900">Sports Complex</h3>
                    <p className="text-sm text-orange-800">
                      Comprehensive sports facilities including indoor and outdoor games for physical fitness
                    </p>
                  </div>

                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                    <div className="mb-3 text-2xl">💻</div>
                    <h3 className="mb-2 text-lg font-semibold text-purple-900">Computing Facility</h3>
                    <p className="text-sm text-purple-800">
                      State-of-the-art computer labs with latest software and high-speed internet connectivity
                    </p>
                  </div>

                  <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                    <div className="mb-3 text-2xl">🏢</div>
                    <h3 className="mb-2 text-lg font-semibold text-red-900">Administrative Office</h3>
                    <p className="text-sm text-red-800">
                      Efficient administrative services for student support and institutional operations
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-300 bg-gray-50 p-6">
                    <div className="mb-3 text-2xl">🌟</div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">Other Facilities</h3>
                    <p className="text-sm text-gray-800">
                      Medical center, cafeteria, transportation, banking, and various support services
                    </p>
                  </div>
                </div>
              </section>

              {/* Key Statistics */}
              <section className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  Facilities at a Glance
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center">
                    <div className="mb-2 text-3xl font-bold text-ssgmce-blue">30+</div>
                    <p className="text-sm font-medium text-gray-600">Computer Labs</p>
                  </div>

                  <div className="text-center">
                    <div className="mb-2 text-3xl font-bold text-ssgmce-blue">100%</div>
                    <p className="text-sm font-medium text-gray-600">Wi-Fi Coverage</p>
                  </div>

                  <div className="text-center">
                    <div className="mb-2 text-3xl font-bold text-ssgmce-blue">24/7</div>
                    <p className="text-sm font-medium text-gray-600">Medical Facility</p>
                  </div>

                  <div className="text-center">
                    <div className="mb-2 text-3xl font-bold text-ssgmce-blue">15+</div>
                    <p className="text-sm font-medium text-gray-600">Bus Routes</p>
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <section className="rounded-lg bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue p-6 text-white">
                <h2 className="mb-3 text-xl font-bold">Explore Our Facilities</h2>
                <p className="mb-4 text-sm text-blue-100">
                  Browse through our comprehensive facility sections to learn more about each service and amenity available on campus.
                </p>
                <p className="text-sm text-blue-100">
                  Use the navigation menu on the left to access detailed information about each facility.
                </p>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Facilities;