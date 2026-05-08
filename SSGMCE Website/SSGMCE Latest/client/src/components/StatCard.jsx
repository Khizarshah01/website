const StatCard = ({ icon: Icon, number, label }) => {
  return (
    <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      {Icon && (
        <div className="w-12 h-12 bg-ssgmce-blue/8 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Icon className="text-lg text-ssgmce-blue" />
        </div>
      )}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{number}</h3>
      <p className="text-xs text-ssgmce-muted font-medium uppercase tracking-wide">{label}</p>
    </div>
  );
};

export default StatCard;
