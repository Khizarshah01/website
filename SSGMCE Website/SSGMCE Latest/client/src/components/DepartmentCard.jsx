const DepartmentCard = ({ name, code, description, programs }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-ssgmce-orange hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
      <div className="bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white p-4 flex justify-between items-center">
        <h3 className="text-base md:text-lg font-bold">{name}</h3>
        <span className="bg-ssgmce-orange px-3 py-1 rounded-full text-xs font-bold">{code}</span>
      </div>
      <div className="p-4">
        <p className="text-gray-600 mb-3 line-clamp-3 text-sm">{description}</p>
        {programs && programs.length > 0 && (
          <div>
            <strong className="text-ssgmce-blue text-sm">Programs:</strong>
            <ul className="mt-2 space-y-1">
              {programs.map((program, idx) => (
                <li key={idx} className="text-xs text-gray-700 border-b border-gray-200 py-1">
                  {program.name} {program.intake && `(Intake: ${program.intake})`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentCard;
