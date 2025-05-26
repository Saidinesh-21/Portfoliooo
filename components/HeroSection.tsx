
import React from 'react';

interface HeroSectionProps {
  name: string;
  professionalSummary: string;
  profileImageUrl: string;
  backgroundImageUrl: string; 
}

const HeroSection: React.FC<HeroSectionProps> = ({ name, professionalSummary, profileImageUrl, backgroundImageUrl }) => {
  return (
    <section 
      className="relative py-20 md:py-32 bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      aria-labelledby="hero-name"
    >
      <div className="absolute inset-0 bg-[#22223b]/80 backdrop-blur-sm"></div> 
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <img 
          src={profileImageUrl} 
          alt="Profile" 
          className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-[#9a8c98] shadow-xl shadow-[#9a8c98]/30" 
        />
        <h1 id="hero-name" className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-[#f0efeb] mb-4"> {/* Orbitron, Isabelline text */}
          {name}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-[#f2e9e4] max-w-3xl mx-auto font-['Roboto Mono']"> 
          {professionalSummary}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;