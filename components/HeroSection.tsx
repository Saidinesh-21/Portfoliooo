import React, { useEffect, useState } from 'react';

interface HeroSectionProps {
  name: string;
  professionalSummary: string;
  profileImageUrl: string;
  backgroundImageUrl: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  professionalSummary,
  profileImageUrl,
  backgroundImageUrl,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100); // trigger animation shortly after mount
    return () => clearTimeout(timer);
  }, []);

  // common fadeInUp styles
  const fadeInUpStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 1s ease-out, transform 1s ease-out',
  };
  return (
    <section
      className={`relative py-20 md:py-32 ${backgroundImageClass}`}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      aria-labelledby="hero-name"
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <img
          src={profileImageUrl}
          alt="Profile"
          className={profileImageClass}
        />
        <h1
          id="hero-name"
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-gray-200 mb-4"
        >
          {name}
        </h1>
        <p
          className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-['Roboto Mono'] text-gray-300"
        >
          {professionalSummary}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
