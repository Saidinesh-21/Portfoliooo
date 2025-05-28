import React, { useState, useEffect, useRef } from 'react';
import { MediaItem } from '../types';
import MediaRenderer from './MediaRenderer';

interface CarouselProps {
  media: MediaItem[];
  eventName: string;
  isBeforeAfter?: boolean; // flag for special before/after timeline
}

const Carousel: React.FC<CarouselProps> = ({ media, eventName, isBeforeAfter = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Before/after toggle only if flagged and event matches
  useEffect(() => {
    if (!isBeforeAfter) return;

    intervalRef.current = setInterval(() => {
      setShowAfter((prev) => !prev);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isBeforeAfter]);

  // Normal carousel next/prev handlers omitted for brevity; you can add here

  if (!media || media.length === 0) return null;

  // If beforeAfter special case: show beforeSrc or afterSrc alternating
  if (isBeforeAfter) {
    const currentItem = media[currentIndex];
    if (!currentItem.beforeSrc || !currentItem.afterSrc) {
      // fallback to normal image if before/after src missing
      return (
        <div className="max-w-full h-auto">
          <MediaRenderer mediaItem={media[currentIndex]} className="rounded-md" />
        </div>
      );
    }

    return (
      <div className="max-w-full h-auto relative rounded-md overflow-hidden">
        <img
          src={showAfter ? currentItem.afterSrc : currentItem.beforeSrc}
          alt={showAfter ? `After - ${eventName}` : `Before - ${eventName}`}
          className="object-contain w-full h-auto rounded-md transition-opacity duration-1000 ease-in-out"
          style={{ opacity: 1 }}
        />
        {currentItem.description && (
          <div className="mt-2 text-gray-800 font-['Roboto Mono'] text-center">
            {currentItem.description}
          </div>
        )}
      </div>
    );
  }

  // Normal carousel for other events (simple single image shown)
  return (
    <div className="max-w-full h-auto rounded-md overflow-hidden">
      <MediaRenderer mediaItem={media[currentIndex]} className="rounded-md" />
      {media[currentIndex].description && (
        <div className="mt-2 text-gray-800 font-['Roboto Mono'] text-center">
          {media[currentIndex].description}
        </div>
      )}
    </div>
  );
};

export default Carousel;
