import React from 'react';

const Header: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-transparent backdrop-blur-md shadow-none sticky top-0 z-40 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold font-heading text-gray-300 px-4 py-2 rounded-lg transition-colors duration-300 hover:text-gray-100 hover:bg-gray-700"
            >
              Lively Lens
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
