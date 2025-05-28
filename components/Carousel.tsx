import React, { useState, useEffect, useRef } from 'react';
import MediaRenderer from './MediaRenderer';
import { MediaItem } from '../types';

interface CarouselProps {
  media: MediaItem[];
  eventName: string;
  isBeforeAfter?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ media, eventName, isBeforeAfter = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isBeforeAfter) return;

    intervalRef.current = setInterval(() => {
      setShowAfter((prev) => !prev);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isBeforeAfter]);

  if (!media.length) return null;

  if (isBeforeAfter) {
    const currentItem = media[currentIndex];
    if (!currentItem.beforeSrc || !currentItem.afterSrc) {
      // fallback: show src if before/after missing
      return (
        <div>
          <MediaRenderer mediaItem={media[currentIndex]} />
          {media[currentIndex].description && (
            <p className="mt-2 text-gray-800 font-['Roboto Mono'] text-center whitespace-pre-wrap">
              {media[currentIndex].description}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="rounded-md overflow-hidden max-w-full h-auto relative">
        <img
          src={showAfter ? currentItem.afterSrc : currentItem.beforeSrc}
          alt={showAfter ? `After - ${eventName}` : `Before - ${eventName}`}
          className="object-contain w-full h-auto rounded-md transition-opacity duration-1000 ease-in-out"
          style={{ opacity: 1 }}
        />
        {currentItem.description && (
          <p className="mt-2 text-gray-800 font-['Roboto Mono'] text-center whitespace-pre-wrap">
            {currentItem.description}
          </p>
        )}
      </div>
    );
  }

  // Normal carousel for other events: show current media with description
  return (
    <div className="rounded-md overflow-hidden max-w-full h-auto">
      <MediaRenderer mediaItem={media[currentIndex]} />
      {media[currentIndex].description && (
        <p className="mt-2 text-gray-800 font-['Roboto Mono'] text-center whitespace-pre-wrap">
          {media[currentIndex].description}
        </p>
      )}
    </div>
  );
};

export default Carousel;
