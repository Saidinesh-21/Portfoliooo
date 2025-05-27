import React from 'react';

const Header: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-transparent shadow-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold font-heading text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors duration-300 bg-transparent"
              aria-label="Scroll to top"
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
