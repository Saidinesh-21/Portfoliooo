import React from 'react';
import { TimelineEventData, MediaType } from './types';
import Header from './components/Header';
import Timeline from './components/Timeline';
import HeroSection from './components/HeroSection';

const sampleTimelineData: TimelineEventData[] = [
  {
    id: 'event-vivo-start',
    date: 'Circa 2018-2019',
    title: 'My First Steps with a Vivo Phone',
    category: 'Mobile Photography',
    description:
      'Exploring the world of photography using just my Vivo smartphone. Learning composition, lighting, and capturing everyday moments. This phase was all about experimentation and finding my eye.',
    eventProfileImageUrl: 'https://i.postimg.cc/zvndDjGJ/DSC-1129.jpg',
    media: [
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/j2zmpzQB/IMG-20190604-182315-01-01-Original.jpg',
        altText: 'Early Vivo shot - Landscape',
        description: 'A misty morning landscape captured with Vivo.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/J0qK3KQ7/IMG-20200208-174105-Original-2.jpg',
        altText: 'Early Vivo shot - Macro',
        description: 'Close-up of a flower, exploring macro.',
      },
      {
        type: MediaType.Image,
        src: 'https://picsum.photos/seed/vivo_pic3/800/600',
        altText: 'Early Vivo shot - Portrait',
        description: 'An early attempt at a street portrait.',
      },
    ],
  },
  {
    id: 'event-camera-iphoneA',
    date: 'Circa 2020-2021',
    title: 'Upgrading to Camera & First iPhone',
    category: 'Photography & Videography',
    description:
      'Took a leap by getting my first dedicated camera and an iPhone. This opened up new possibilities in terms of quality, control, and learning editing techniques for both photos and videos.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_camera_iphoneA/100/100',
    media: [
      {
        type: MediaType.Image,
        src: 'https://picsum.photos/seed/camera_shot1/800/600',
        altText: 'First camera photo',
        description: 'One of my first shots with the new DSLR.',
      },
      {
        type: MediaType.GenericVideo,
        src: 'https://www.w3schools.com/html/mov_bbb.mp4',
        altText: 'Early video edit with iPhone',
        description: 'Experimenting with video on the iPhone.',
      },
      {
        type: MediaType.Image,
        src: 'https://picsum.photos/seed/iphoneA_photo1/800/600',
        altText: 'iPhone A photography example',
        description: 'Discovering the capabilities of iPhone photography.',
      },
      {
        type: MediaType.Image,
        src: 'https://picsum.photos/seed/camera_shot2/800/600',
        altText: 'Learning depth of field',
        description: 'Practicing depth of field with the DSLR.',
      },
    ],
  },
  // Add more events as needed...
];

const App: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-800 to-white text-gray-900"
      style={{ fontFamily: "'Roboto Mono', monospace" }}
    >
      <Header />
      <main className="flex-grow">
        <HeroSection
          name="Vamshi Mailaram"
          professionalSummary="Passionate visual storyteller, capturing moments and crafting narratives through photography and videography."
          profileImageUrl="https://i.postimg.cc/0yVkXJfV/Vamsiiiiii-dpp.jpg"
          backgroundImageUrl="https://i.postimg.cc/1zGmKNb7/IMG-7447-2-Original-Original.jpg"
          profileImageClass="object-contain w-40 h-40 rounded-full mx-auto mb-6 border-4 border-gray-300 shadow-xl shadow-gray-300/30"
          backgroundImageClass="bg-cover bg-center"
        />
        <Timeline events={sampleTimelineData} />
      </main>
      <footer className="text-center py-8 text-gray-300 text-sm font-['Roboto Mono'] bg-transparent backdrop-blur-md shadow-none">
        <p>&copy; {new Date().getFullYear()} Vamshi Mailaram. All rights reserved.</p>
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
