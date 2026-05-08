const PageHeader = ({ title, subtitle, backgroundImage }) => {
  return (
    <div 
      className={`text-white py-16 md:py-20 text-center relative ${!backgroundImage ? 'bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue' : ''}`}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}}
    >
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 text-shadow">{title}</h1>
        {subtitle && <p className="text-base md:text-lg text-ssgmce-light-blue">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
