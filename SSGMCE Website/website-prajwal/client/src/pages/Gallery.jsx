import { useState } from 'react';
import PageHeader from '../components/PageHeader';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Campus', 'Events', 'Labs', 'Sports', 'Cultural'];

  const galleryImages = [
    { id: 1, category: 'Campus', title: 'College Main Building', url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600' },
    { id: 2, category: 'Campus', title: 'Library', url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600' },
    { id: 3, category: 'Labs', title: 'Computer Lab', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600' },
    { id: 4, category: 'Labs', title: 'Engineering Lab', url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600' },
    { id: 5, category: 'Events', title: 'Technical Symposium', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600' },
    { id: 6, category: 'Events', title: 'Annual Day Celebration', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600' },
    { id: 7, category: 'Cultural', title: 'Cultural Fest', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600' },
    { id: 8, category: 'Cultural', title: 'Music Performance', url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600' },
    { id: 9, category: 'Sports', title: 'Sports Ground', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600' },
    { id: 10, category: 'Sports', title: 'Cricket Match', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600' },
    { id: 11, category: 'Campus', title: 'Auditorium', url: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=600' },
    { id: 12, category: 'Campus', title: 'Seminar Hall', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600' },
  ];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="animation-fade-in">
      <PageHeader 
        title="Photo Gallery" 
        subtitle="Glimpses of Campus Life" 
      />

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-ssgmce-blue text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div 
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="bg-ssgmce-orange px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">
                      {image.category}
                    </span>
                    <h3 className="text-xl font-bold">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-12">Video Gallery</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Campus Tour', thumbnail: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600' },
              { title: 'Technical Symposium 2023', thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600' },
              { title: 'Cultural Fest Highlights', thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600' },
              { title: 'Sports Meet 2023', thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600' },
            ].map((video, index) => (
              <div key={index} className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="aspect-video">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-ssgmce-blue ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-white font-bold text-lg">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Virtual Tour */}
      <section className="py-16 bg-gradient-to-r from-ssgmce-blue to-ssgmce-dark-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Virtual Campus Tour</h2>
          <p className="text-xl mb-8 text-ssgmce-light-blue max-w-3xl mx-auto">
            Take a 360° virtual tour of our beautiful campus and explore our facilities from anywhere
          </p>
          <button className="bg-ssgmce-orange hover:bg-ssgmce-light-orange text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg">
            Start Virtual Tour
          </button>
        </div>
      </section>

      {/* Download Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ssgmce-blue mb-8">Download Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'College Brochure', size: '2.5 MB', icon: '📄' },
              { title: 'Campus Map', size: '1.2 MB', icon: '🗺️' },
              { title: 'Prospectus 2024', size: '5.8 MB', icon: '📚' },
            ].map((resource, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="text-6xl mb-4">{resource.icon}</div>
                <h3 className="text-lg font-bold text-ssgmce-blue mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.size}</p>
                <button className="bg-ssgmce-blue hover:bg-ssgmce-dark-blue text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
