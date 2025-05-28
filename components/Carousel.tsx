import React, { useState, useRef, useEffect } from 'react';
import { MediaItem } from '../types';
import MediaRenderer from './MediaRenderer';

interface CarouselProps {
  media: MediaItem[];
}

interface CarouselSlideItemProps {
  item: MediaItem;
  itemsToShow: number;
  index: number;
  onHoverStart: (index: number) => void;
  onHoverEnd: (index: number) => void;
}

const CarouselSlideItem: React.FC<CarouselSlideItemProps> = ({
  item,
  itemsToShow,
  index,
  onHoverStart,
  onHoverEnd,
}) => {
  return (
    <div
      className="relative flex-shrink-0 cursor-pointer"
      style={{ width: `calc(100% / ${itemsToShow})`, height: '100%' }}
      onMouseEnter={() => onHoverStart(index)}
      onMouseLeave={() => onHoverEnd(index)}
      onTouchStart={() => onHoverStart(index)}
      onTouchEnd={() => onHoverEnd(index)}
      onTouchCancel={() => onHoverEnd(index)}
      role="group"
      aria-roledescription="slide"
    >
      <div className="flex items-center justify-center p-0.5 sm:p-1 rounded-md transition-transform duration-300 ease-in-out hover:scale-105 h-full">
        <MediaRenderer mediaItem={item} className="max-w-full max-h-full object-contain rounded-md" />
      </div>
    </div>
  );
};

const Carousel: React.FC<CarouselProps> = ({ media }) => {
  const [itemsToShow, setItemsToShow] = useState(3);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Handle hover start with 1 second delay
  const onHoverStart = (index: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(index);
      hoverTimeoutRef.current = null;
    }, 1000);
  };

  // Handle hover end with immediate start to close after 200ms
  const onHoverEnd = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);

    closeTimeoutRef.current = setTimeout(() => {
      setHoveredIndex((current) => (current === index ? null : current));
      closeTimeoutRef.current = null;
    }, 200);
  };

  // Prevent modal from closing when hovered
  const onModalMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const onModalMouseLeave = (index: number) => {
    onHoverEnd(index);
  };

  // Update how many items to show based on window width
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  // Ensure currentIndex is in valid range when itemsToShow changes
  useEffect(() => {
    if (currentIndex > Math.max(0, media.length - itemsToShow)) {
      setCurrentIndex(Math.max(0, media.length - itemsToShow));
    }
  }, [itemsToShow, media.length, currentIndex]);

  // Handle horizontal wheel scrolling
  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;

    const handleWheel = (e: WheelEvent) => {
      const threshold = 10;
      if (Math.abs(e.deltaX) > threshold) {
        const direction = e.deltaX > 0 ? 1 : -1;
        setCurrentIndex((prev) => {
          const maxIndex = media.length - itemsToShow;
          let nextIndex = prev + direction;
          if (nextIndex < 0) nextIndex = 0;
          else if (nextIndex > maxIndex) nextIndex = maxIndex;
          return nextIndex;
        });
        e.preventDefault();
      } else if (e.shiftKey && Math.abs(e.deltaY) > threshold) {
        const direction = e.deltaY > 0 ? 1 : -1;
        setCurrentIndex((prev) => {
          const maxIndex = media.length - itemsToShow;
          let nextIndex = prev + direction;
          if (nextIndex < 0) nextIndex = 0;
          else if (nextIndex > maxIndex) nextIndex = maxIndex;
          return nextIndex;
        });
        e.preventDefault();
      }
    };

    node.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      node.removeEventListener('wheel', handleWheel);
    };
  }, [media.length, itemsToShow]);

  // Auto-scroll every 5 seconds if not interacting
  useEffect(() => {
    if (isInteracting) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = media.length - itemsToShow;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isInteracting, media.length, itemsToShow]);

  // Interaction handlers for auto-scroll pause/resume
  const onInteractionStart = () => setIsInteracting(true);
  const onInteractionEnd = () => setIsInteracting(false);

  if (!media || media.length === 0) {
    return (
      <p className="text-gray-400 p-4 text-center font-['Roboto Mono']">No media to display.</p>
    );
  }

  return (
    <>
      {/* Modal preview for hovered item only */}
      {hoveredIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center p-4"
          onMouseEnter={onModalMouseEnter}
          onMouseLeave={() => onModalMouseLeave(hoveredIndex)}
          onTouchStart={onModalMouseEnter}
          onTouchEnd={() => onModalMouseLeave(hoveredIndex)}
          onTouchCancel={() => onModalMouseLeave(hoveredIndex)}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-[80vw] max-h-[90vh] flex flex-col items-center transition-all duration-500 ease-in-out">
            <div className="flex-shrink-0 max-w-full max-h-[76vh]">
              <MediaRenderer
                mediaItem={media[hoveredIndex]}
                className="max-w-full max-h-[76vh] object-contain rounded-md"
              />
            </div>
            {media[hoveredIndex].description && (
              <div className="mt-4 text-gray-900 font-['Roboto Mono'] text-center max-w-[90%]">
                {media[hoveredIndex].description}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Carousel container */}
      <div
        ref={carouselRef}
        onMouseEnter={onInteractionStart}
        onMouseLeave={onInteractionEnd}
        onTouchStart={onInteractionStart}
        onTouchEnd={onInteractionEnd}
        className="relative w-full aspect-[16/9] group/carousel overflow-hidden select-none"
        role="region"
        aria-label="Media carousel"
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {media.map((item, index) => (
            <CarouselSlideItem
              key={item.src + index}
              item={item}
              itemsToShow={itemsToShow}
              index={index}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;