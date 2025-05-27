import React, { useEffect, useState } from 'react';

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fadeInUpStyle = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
  });

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
          style={fadeInUpStyle(0)}
        />
        <h1
          id="hero-name"
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading mb-4"
          style={{ ...fadeInUpStyle(0.3), color: 'black' }}
        >
          {name}
        </h1>
        <p
          className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-['Roboto Mono']"
          style={{ ...fadeInUpStyle(0.6), color: 'black' }}
        >
          {professionalSummary}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
