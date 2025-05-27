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
  profileImageClass = "w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-gray-300 shadow-xl shadow-gray-300/30",
  backgroundImageClass = "bg-cover bg-center",
}) => {
  return (
    <section 
      className={`relative py-20 md:py-32 ${backgroundImageClass} text-gray-900`} 
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      aria-labelledby="hero-name"
    >
      {/* Overlay to darken and blur background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-white/70 backdrop-blur-sm"></div> 
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <img 
          src={profileImageUrl} 
          alt="Profile" 
          className={profileImageClass}
        />
        <h1 id="hero-name" className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4">
          {name}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-['Roboto Mono'] text-gray-700"> 
          {professionalSummary}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
