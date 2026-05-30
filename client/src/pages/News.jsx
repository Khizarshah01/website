import PageHeader from "../components/PageHeader";
import NewsCard from "../components/NewsCard";
import useFetch from "../hooks/useFetch";
import { useSearchParams, Link } from "react-router-dom";

const News = () => {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const {
    data: newsData,
    loading,
    error,
  } = useFetch("/news");

  // Fallback data is used only when the backend is unavailable.
  const staticNews = [
    {
      _id: "1",
      title: "Registration Open for SWAYAM/NPTEL Course",
      publishDate: "2026-01-24",
      description:
        "Students are informed that registration is now open for SWAYAM/NPTEL online courses on Quantum Computing / Quantum Technology.",
      category: "Announcement",
      fileUrl:
        "https://www.ssgmce.ac.in/administrator/uploads/SWAYAMNPTEL_Notice.jpeg",
    },
    {
      _id: "2",
      title: "RECRUITMENT",
      publishDate: "2026-01-04",
      description:
        "Applications are invited for the post at Shri Gajanan Maharaj English School, Shegaon. Submit details before 13th January 2026.",
      category: "Announcement",
      fileUrl: "https://www.ssgmce.ac.in/administrator/uploads/sgmes2026.jpeg",
    },
    {
      _id: "3",
      title: "RECRUITMENT",
      publishDate: "2025-12-24",
      description:
        "Applications are invited for Assistant Professor (CSE) / Human Resources (HR) / Research Associate. Last date: 10th January 2026.",
      category: "Announcement",
      fileUrl:
        "https://www.ssgmce.ac.in/administrator/uploads/Recruitmentdated24-12-2025.pdf",
    },
    {
      _id: "4",
      title: "Ph.D. Admission Notification & Form",
      publishDate: "2025-11-29",
      description:
        "Applications are invited in prescribed format for admission to Ph.D. programmes for session 2025-26.",
      category: "Admission",
      fileUrl:
        "https://www.ssgmce.ac.in/administrator/uploads/Ph.D.%20Admission%20Notification%202025-26.pdf",
    },
    {
      _id: "5",
      title: "Open defense for PhD thesis submission",
      publishDate: "2025-11-24",
      description:
        "Open defense for PhD thesis submission is scheduled for 28th November 2025 at 12 PM onwards.",
      category: "Examination",
      fileUrl:
        "https://www.ssgmce.ac.in/administrator/uploads/CSE_Open%20Defence%20VSM.pdf",
    },
  ];

  const baseNewsItems =
    Array.isArray(newsData) && newsData.length > 0
      ? newsData
      : error
        ? staticNews
        : [];

  const newsItems = selectedId 
    ? baseNewsItems.filter((item) => (item._id || item.id) === selectedId)
    : baseNewsItems;

  return (
    <div className="animation-fade-in">
      <PageHeader
        title="Latest News"
        subtitle="All news articles and updates from SSGMCE"
      />

      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-ssgmce-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-ssgmce-blue"></div>
                <p className="mt-4 text-gray-600">Loading news...</p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Live news could not be fetched, showing latest available
                    updates.
                  </div>
                )}

                {selectedId && (
                  <div className="mb-6">
                    <Link to="/news" className="text-ssgmce-blue font-medium hover:underline inline-flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Back to All News
                    </Link>
                  </div>
                )}

                {newsItems.length > 0 ? (
                  <div className="space-y-4">
                    {newsItems.map((item, index) => (
                      <NewsCard
                        key={item._id || `${item.title}-${index}`}
                        title={item.title}
                        date={item.publishDate || item.date || item.createdAt}
                        dateLabel={
                          item.day && item.month ? `${item.day} ${item.month}` : ""
                        }
                        description={item.description}
                        category={item.category || "General"}
                        fileUrl={item.fileUrl}
                        showDetailsLink
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <p className="text-gray-600">No news available right now.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
