const NewsCard = ({
  title,
  date,
  description,
  category,
  fileUrl = "",
  showDetailsLink = false,
  dateLabel = "",
}) => {
  const safeDate = date ? new Date(date) : null;
  const dateText =
    dateLabel ||
    (safeDate && !Number.isNaN(safeDate.getTime())
      ? safeDate.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Latest");

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300">
      <div className="flex gap-4">
        <div className="bg-ssgmce-blue text-white px-3 py-2 rounded-lg text-center font-semibold min-w-[80px] text-xs flex-shrink-0 self-start">
          {dateText}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] text-ssgmce-orange font-semibold uppercase tracking-wide">{category}</span>
          <h4 className="text-ssgmce-blue font-semibold text-sm mb-1 leading-snug">{title}</h4>
          <p className="text-ssgmce-muted text-xs line-clamp-2 leading-relaxed">{description}</p>
          {showDetailsLink && fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center mt-2 text-xs font-semibold text-ssgmce-blue hover:text-ssgmce-orange transition-colors"
            >
              Click for Details
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
