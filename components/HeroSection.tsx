import React from 'react';

interface HeroSectionProps {
  name: string;
  professionalSummary: string;
  profileImageUrl: string;
  backgroundImageUrl: string;
  profileImageClass?: string;
  backgroundImageClass?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  professionalSummary,
  profileImageUrl,
  backgroundImageUrl,
  profileImageClass = 'w-40 h-40 rounded-full mx-auto mb-6 border-4 border-gray-300 shadow-xl shadow-gray-300/30',
  backgroundImageClass = 'bg-cover bg-center',
}) => {
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
