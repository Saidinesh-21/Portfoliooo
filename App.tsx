import React, { useEffect } from 'react';
import { TimelineEventData, MediaType } from './types';
import Header from './components/Header';
import Timeline from './components/Timeline';
import HeroSection from './components/HeroSection';

const sampleTimelineData: TimelineEventData[] = [
  // Your sample timeline data...
];

const App: React.FC = () => {
  useEffect(() => {
    document.body.style.filter = 'none';
    document.documentElement.style.filter = 'none';
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-800 to-white text-gray-900"
      style={{
        fontFamily: "'Roboto Mono', monospace",
        transition: "background-color 0.5s ease", // Smooth transition for background
      }}
    >
      <Header />
      <main className="flex-grow">
        <HeroSection
          name="Vamshi Mailaram"
          professionalSummary="Passionate visual storyteller, capturing moments and crafting narratives through photography and videography."
          profileImageUrl="https://i.postimg.cc/0yVkXJfV/Vamsiiiiii-dpp.jpg"
          backgroundImageUrl="https://i.postimg.cc/1zGmKNb7/IMG-7447-2-Original-Original.jpg"
          profileImageClass="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-gray-300 shadow-xl shadow-gray-300/30"
          backgroundImageClass="bg-cover bg-center"
        />
        <Timeline events={sampleTimelineData} />
      </main>
      <footer className="text-center py-8 text-gray-700 text-sm font-['Roboto Mono'] bg-transparent backdrop-blur-md shadow-none">
        <p>&copy; {new Date().getFullYear()} Vamshi Mailaram. All rights reserved.</p>
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
