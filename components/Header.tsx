
import React from 'react';

const Header: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <header className="bg-[#22223b]/80 backdrop-blur-md shadow-lg sticky top-0 z-40 w-full"> {/* space-cadet background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button 
              onClick={scrollToTop} 
              className="text-2xl font-bold font-heading text-[#9a8c98] bg-[#181828] hover:bg-[#4a4e69] hover:text-[#c9ada7] px-4 py-2 rounded-lg transition-colors duration-300" /* Rose Quartz text, Dark bg, Ultra Violet hover bg, Pale Dogwood hover text */
            >
              My Portfolio
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;