

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
    description: 'Exploring the world of photography using just my Vivo smartphone. Learning composition, lighting, and capturing everyday moments. This phase was all about experimentation and finding my eye.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_vivo/100/100',
    media: [
      { type: MediaType.Image, src: 'https://picsum.photos/seed/vivo_pic1/800/600', altText: 'Early Vivo shot - Landscape', description: 'A misty morning landscape captured with Vivo.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/vivo_pic2/800/600', altText: 'Early Vivo shot - Macro', description: 'Close-up of a flower, exploring macro.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/vivo_pic3/800/600', altText: 'Early Vivo shot - Portrait', description: 'An early attempt at a street portrait.' },
    ],
  },
  {
    id: 'event-camera-iphoneA',
    date: 'Circa 2020-2021',
    title: 'Upgrading to Camera & First iPhone',
    category: 'Photography & Videography',
    description: 'Took a leap by getting my first dedicated camera and an iPhone. This opened up new possibilities in terms of quality, control, and learning editing techniques for both photos and videos.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_camera_iphoneA/100/100',
    media: [
      { type: MediaType.Image, src: 'https://picsum.photos/seed/camera_shot1/800/600', altText: 'First camera photo', description: 'One of my first shots with the new DSLR.' },
      { type: MediaType.GenericVideo, src: 'https://www.w3schools.com/html/mov_bbb.mp4', altText: 'Early video edit with iPhone', description: 'Experimenting with video on the iPhone.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/iphoneA_photo1/800/600', altText: 'iPhone A photography example', description: 'Discovering the capabilities of iPhone photography.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/camera_shot2/800/600', altText: 'Learning depth of field', description: 'Practicing depth of field with the DSLR.' },
    ],
  },
  {
    id: 'event-client-dslr',
    date: '2021-2022',
    title: 'First Client Project & DSLR Upgrade',
    category: 'Professional Growth',
    description: 'Landed my first paid client project, which motivated an upgrade to a more advanced DSLR. Started to take on small gigs and build a professional portfolio.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_client/100/100',
    media: [
      { type: MediaType.Image, src: 'https://picsum.photos/seed/client_work1/800/600', altText: 'Client Project Sample 1', description: 'Shot from a local event coverage.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/dslr_upgrade_shot/800/600', altText: 'New DSLR quality', description: 'Testing the limits of the new DSLR.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/client_work2/800/600', altText: 'Client Project Sample 2', description: 'Product photography for a small business.' },
    ],
  },
  {
    id: 'event-editing-mastery',
    date: '2022',
    title: 'Mastering Lightroom & Photoshop (Before & After)',
    category: 'Photo Editing',
    description: 'Deep dive into photo editing techniques. This period was about transforming good photos into great ones, focusing on color grading, retouching, and creative effects. Showcasing some before & after examples.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_editing/100/100',
    media: [
      { type: MediaType.Image, src: 'https://picsum.photos/seed/edit_before1/800/600', altText: 'Before Editing - Landscape', description: 'Original landscape shot, SOOC.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/edit_after1/800/600', altText: 'After Editing - Landscape', description: 'After Lightroom: Enhanced colors & mood.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/edit_before2/800/600', altText: 'Before Editing - Portrait', description: 'Raw portrait capture.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/edit_after2/800/600', altText: 'After Editing - Portrait', description: 'Photoshop retouching and grading applied.' },
    ],
  },
  {
    id: 'event-upgraded-iphone-reels',
    date: 'Circa 2022 - Present',
    title: 'Advanced iPhone & Instagram Reels',
    category: 'Mobile Content Creation',
    description: 'Mastering content creation with an upgraded iPhone. Focused on producing high-quality Instagram Reels, travel vlogs, and leveraging advanced mobile editing apps.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_iphone_pro/100/100',
    media: [
      { type: MediaType.InstagramReel, src: 'https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/Sample-MP4-Video-File-Download.mp4', altText: 'Recent Instagram Reel', description: 'A quick edit for an Instagram Reel.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/advanced_iphone1/800/600', altText: 'Advanced iPhone photo - Night mode', description: 'Exploring night mode on the new iPhone.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/advanced_iphone2/800/600', altText: 'Advanced iPhone photo - Cinematic', description: 'Attempting a cinematic shot with iPhone.' },
    ],
  },
  {
    id: 'event-drone-videography',
    date: '2023',
    title: 'Exploring Drone Videography',
    category: 'Aerial Videography',
    description: 'Added a drone to my toolkit, opening up new perspectives for videography. Learning flight controls, aerial composition, and editing drone footage.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_drone/100/100',
    media: [
      { type: MediaType.GenericVideo, src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', altText: 'First Drone Flight Footage', description: 'Early test flight with the drone.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/drone_shot1/800/600', altText: 'Aerial Landscape', description: 'Capturing landscapes from a new angle.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/drone_shot2/800/600', altText: 'Top-down Drone Shot', description: 'Experimenting with top-down perspectives.' },
    ],
  },
  {
    id: 'event-travel-documentary',
    date: 'Ongoing',
    title: 'Major Travel Documentary: The Mountain Peaks',
    category: 'Documentary Filmmaking',
    description: 'Currently working on a personal passion project - a travel documentary series focused on mountain landscapes and cultures. This involves extensive travel, filming, and storytelling.',
    eventProfileImageUrl: 'https://picsum.photos/seed/me_travel_doc/100/100',
    media: [
      { type: MediaType.YouTubeVideo, src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', altText: 'Documentary Trailer Teaser', description: 'Teaser for "The Mountain Peaks" documentary.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/mountain_peak1/800/600', altText: 'Mountain Scenery 1', description: 'Stunning vista from the documentary filming.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/mountain_peak2/800/600', altText: 'Mountain Scenery 2', description: 'Behind the scenes during a challenging shoot.' },
      { type: MediaType.Image, src: 'https://picsum.photos/seed/local_culture_doc/800/600', altText: 'Local Culture Interaction', description: 'Capturing local culture for the documentary.' },
    ],
  },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#22223b] text-[#f0efeb]"> {/* space-cadet bg, isabelline text */}
      <Header />
      <main className="flex-grow">
        <HeroSection
          name="Vamshi Mailaram"
          professionalSummary="Passionate visual storyteller, capturing moments and crafting narratives through photography and videography."
          profileImageUrl="https://picsum.photos/seed/vamshi_profile/200/200"
          backgroundImageUrl="/images/Background.jpg"

        />
        <Timeline events={sampleTimelineData} />
      </main>
      <footer className="text-center py-8 text-[#f0efeb] text-sm font-['Roboto Mono'] bg-[#181828]"> {/* pale-dogwood text, darker space-cadet bg for footer */}
        <p>&copy; {new Date().getFullYear()} Vamshi Mailaram. All rights reserved.</p>
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;