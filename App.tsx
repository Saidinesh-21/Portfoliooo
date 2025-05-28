import React from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import HeroSection from './components/HeroSection';

const sampleTimelineData = [
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
        type: 'image',
        src: 'https://i.postimg.cc/j2zmpzQB/IMG-20190604-182315-01-01-Original.jpg',
        altText: 'Early Vivo shot - Landscape',
        description: 'A misty morning landscape captured with Vivo.',
      },
      {
        type: 'image',
        src: 'https://i.postimg.cc/J0qK3KQ7/IMG-20200208-174105-Original-2.jpg',
        altText: 'Early Vivo shot - Macro',
        description: 'Close-up of a flower, exploring macro.',
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
        type: 'image',
        src: 'https://i.postimg.cc/Jh16tSNY/IMG-8748-Original.jpg',
        altText: 'Early video edit with iPhone',
        description: 'Experimenting with video on the iPhone.',
      },
      {
        type: 'image',
        src: 'https://i.postimg.cc/Ls84kwyW/IMG-5598-Original.jpg',
        altText: 'First camera photo',
        description: 'One of my first shots with the new DSLR.',
      },
    ],
  },
  {
    id: 'event-client-dslr',
    date: '2021-2022',
    title: 'First Client Project & DSLR Upgrade',
    category: 'Professional Growth',
    description:
      'Landed my first paid client project, which motivated an upgrade to a more advanced DSLR. Started to take on small gigs and build a professional portfolio.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_client/100/100',
    media: [
      {
        type: 'image',
        src: 'https://i.postimg.cc/SsssqsHV/BIRD-FINAL.jpg',
        altText: 'Client Project Sample 1',
        description: 'Shot from a local event coverage.',
      },
    ],
  },
  {
    id: 'event-editing-mastery',
    date: '2022',
    title: 'Mastering Lightroom & Photoshop (Before & After)',
    category: 'Photo Editing',
    description:
      'Deep dive into photo editing techniques. This period was about transforming good photos into great ones, focusing on color grading, retouching, and creative effects. Showcasing some before & after examples.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_editing/100/100',
    media: [
      {
        beforeSrc: 'https://picsum.photos/seed/edit_before1/800/600',
        afterSrc: 'https://picsum.photos/seed/edit_after1/800/600',
        description: 'Original landscape shot, SOOC to after Lightroom: Enhanced colors & mood.',
      },
      {
        beforeSrc: 'https://picsum.photos/seed/edit_before2/800/600',
        afterSrc: 'https://picsum.photos/seed/edit_after2/800/600',
        description: 'Raw portrait capture to Photoshop retouching and grading applied.',
      },
    ],
  },
];

const App: React.FC = () => (
  <div
    className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-800 to-white text-gray-900"
    style={{ fontFamily: "'Averia Serif Libre', cursive" }}
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

export default App;
