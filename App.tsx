import React from 'react';
import { TimelineEventData, MediaType } from './types';
import Header from './components/Header';
import Timeline from './components/Timeline';
import HeroSection from './components/HeroSection';
import Carousel from './components/Carousel';

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
        src: 'https://i.postimg.cc/Y0GwDwgX/IMG-20190704-175804-Original.jpg',
        altText: 'Early Vivo shot - Portrait',
        description: 'An early attempt at a street portrait.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/5976pZ6L/IMG-20191128-010649-Original.jpg',
        altText: 'Early Vivo shot - Portrait',
        description: 'A flower in bloom, capturing nature’s beauty.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/d06q3yCr/IMG-20190524-123833-Original.jpg',
        altText: 'Early Vivo shot - Portrait',
        description: 'And my first visit to the beautiful Ellora Caves.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/T3qtNpPH/IMG-20190818-173615-01-Original.jpg',
        altText: 'Early Vivo shot - Portrait',
        description: 'On a Rainy day, back 2019',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/k5LRxymr/IMG-20181230-100435-Original.jpg',
        altText: 'Early Vivo shot - Portrait',
        description: 'Symmetry',
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
        src: 'https://i.postimg.cc/Jh16tSNY/IMG-8748-Original.jpg',
        altText: 'Early video edit with iPhone',
        description: 'Experimenting with video on the iPhone.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/Ls84kwyW/IMG-5598-Original.jpg',
        altText: 'First camera photo',
        description: 'One of my first shots with the new DSLR.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/6p1c5TQq/IMG-9696.avif',
        altText: 'First camera photo',
        description: 'One of my first shots with the new DSLR.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/02PTJmXW/IMG-6558.avif',
        altText: 'Early video edit with iPhone',
        description: 'Experimenting with video on the iPhone.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/XNch3qNw/IMG-2813-Original.jpg',
        altText: 'iPhone A photography example',
        description: 'Discovering the capabilities of iPhone photography.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/CxZD77FM/IMG-9008.avif',
        altText: 'iPhone A photography example',
        description: 'Discovering the capabilities of iPhone photography.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/1t0D6zyp/IMG-8919.avif',
        altText: 'iPhone A photography example',
        description: 'Discovering the capabilities of iPhone photography.',
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
        type: MediaType.Image,
        src: 'https://i.postimg.cc/SsssqsHV/BIRD-FINAL.jpg',
        altText: 'Client Project Sample 1',
        description: 'Shot from a local event coverage.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/R0mSh1ZV/IMG-2615.jpg',
        altText: 'Client Project Sample 1',
        description: 'Shot from a local event coverage.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/MZgvxQVX/IMG-5644.jpg',
        altText: 'Client Project Sample 1',
        description: 'Shot from a local event coverage.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/fTZbT84J/IMG-5606.jpg',
        altText: 'New DSLR quality',
        description: 'Testing the limits of the new DSLR.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/Z5Hb9BB8/IMG-20200110-142714-Original.jpg',
        altText: 'New DSLR quality',
        description: 'Testing the limits of the new DSLR.',
      },
      {
        type: MediaType.Image,
        src: 'https://i.postimg.cc/P5p0Gk6Z/IMG-5232-Original-Original.jpg',
        altText: 'Client Project Sample 2',
        description: 'Product photography for a small business.',
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
  {
    id: 'event-upgraded-iphone-reels',
    date: 'Circa 2022 - Present',
    title: 'Advanced iPhone & Instagram Reels',
    category: 'Mobile Content Creation',
    description:
      'Mastering content creation with an upgraded iPhone. Focused on producing high-quality Instagram Reels, travel vlogs, and leveraging advanced mobile editing apps.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_iphone_pro/100/100',
    media: [
      {
        type: MediaType.InstagramReel,
        src: 'https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/Sample-MP4-Video-File-Download.mp4',
        altText: 'Recent Instagram Reel',
        description: 'A quick edit for an Instagram Reel.',
      },
      {
        type: MediaType.Image,
        src: 'https://picsum.photos/seed/advanced_iphone1/800/600',
        altText: 'Advanced iPhone photo - Night mode',
        description: 'Exploring night mode on the new iPhone.',
      },
      {
        type: MediaType.Image,
        src: 'https://picsum.photos/seed/advanced_iphone2/800/600',
        altText: 'Advanced iPhone photo - Cinematic',
        description: 'Attempting a cinematic shot with iPhone.',
      },
    ],
  },
  {
    id: 'event-drone-videography',
    date: '2023',
    title: 'Exploring Drone Videography',
    category: 'Aerial Videography',
    description:
      'Added a drone to my toolkit, opening up new perspectives for videography. Learning flight controls, aerial composition, and editing drone footage.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_drone/100/100',
    media: [
      {
        type: MediaType.GenericVideo,
        src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        altText: 'First Drone Flight Footage',
        description: 'Early test flight with the drone.',
      },
      {
        type: MediaType.Image,
        src: 'https://picsum.photos/seed/drone_shot1/800/600',
        altText: 'Aerial Landscape',
        description: 'Capturing landscapes from a new angle.',
      },
      {
        type: MediaType.Image,
        src: 'https://picsum.photos/seed/drone_shot2/800/600',
        altText: 'Top-down Drone Shot',
        description: 'Experimenting with top-down perspectives.',
      },
    ],
  },
  {
    id: 'event-travel-documentary',
    date: 'Ongoing',
    title: 'Major Travel Documentary: The Mountain Peaks',
    category: 'Documentary Filmmaking',
    description:
      'Currently working on a personal passion project - a travel documentary series focused on mountain landscapes and cultures. This involves extensive travel, filming, and storytelling.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_travel_doc/100/100',
    media: [
      {
        type: MediaType.YouTubeVideo,
        src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        altText: 'Documentary Trailer Teaser',
        description: 'Teaser for "The Mountain Peaks" documentary.',
      },
      {
        type: MediaType.Image,
        src: 'https://picsum.photos/seed/mountain_peak1/800/600',
        altText: 'Mountain Scenery 1',
        description: 'Stunning vista from the documentary filming.',
      },
      {
        type: MediaType.Image,
        src: 'https://picsum.photos/seed/mountain_peak2/800/600',
        altText: 'Mountain Scenery 2',
        description: 'Behind the scenes during a challenging shoot.',
      },
      {
        type: MediaType.Image,
        src: 'https://picsum.photos/seed/local_culture_doc/800/600',
        altText: 'Local Culture Interaction',
        description: 'Capturing local culture for the documentary.',
      },
    ],
  },
];

const App: React.FC = () => {
  return (
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

        {sampleTimelineData.map((timeline) => (
          <section key={timeline.id} className="my-12 px-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-heading mb-6 text-center">{timeline.title}</h2>
            <p className="text-center mb-6 font-['Roboto Mono'] max-w-3xl mx-auto">{timeline.description}</p>
            <Carousel
              media={timeline.media}
              eventName={timeline.title}
            />
          </section>
        ))}
      </main>
      <footer className="text-center py-8 text-gray-300 text-sm font-['Roboto Mono'] bg-transparent backdrop-blur-md shadow-none">
        <p>&copy; {new Date().getFullYear()} Vamshi Mailaram. All rights reserved.</p>
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
