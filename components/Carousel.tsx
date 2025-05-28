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
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);
  const hoveredItemRef = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Called when user moves mouse inside carousel area
  const handleMouseMove = (e: MouseEvent) => {
    if (
      !lastMousePosRef.current ||
      lastMousePosRef.current.x !== e.clientX ||
      lastMousePosRef.current.y !== e.clientY
    ) {
      // Mouse moved: reset idle timer
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      // Start idle timer again if still hovering an item
      if (hoveredItemRef.current !== null) {
        idleTimerRef.current = setTimeout(() => {
          setHoveredIndex(hoveredItemRef.current);
          idleTimerRef.current = null;
        }, 1250);
      }
    }
  };

  // On hover start: begin listening for mouse move and reset timers
  const onHoverStart = (index: number) => {
    hoveredItemRef.current = index;
    setHoveredIndex(null); // Don't show immediately
    lastMousePosRef.current = null;

    // Remove any previous timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    // Add mousemove listener
    if (carouselRef.current) {
      carouselRef.current.addEventListener('mousemove', handleMouseMove);
    }
  };

  // On hover end: clean up timers and listeners, close hover modal after delay
  const onHoverEnd = (index: number) => {
    hoveredItemRef.current = null;
    lastMousePosRef.current = null;

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    if (carouselRef.current) {
      carouselRef.current.removeEventListener('mousemove', handleMouseMove);
    }

    // Delay closing modal to prevent flicker
    setTimeout(() => {
      setHoveredIndex((current) => (current === index ? null : current));
    }, 200);
  };

  // Responsive logic to set items shown
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

  // Adjust currentIndex if needed
  useEffect(() => {
    if (currentIndex > Math.max(0, media.length - itemsToShow)) {
      setCurrentIndex(Math.max(0, media.length - itemsToShow));
    }
  }, [itemsToShow, media.length, currentIndex]);

  // Wheel event for horizontal scroll
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
    return () => node.removeEventListener('wheel', handleWheel);
  }, [media.length, itemsToShow]);

  if (!media || media.length === 0) {
    return (
      <p className="text-gray-400 p-4 text-center font-['Roboto Mono']">No media to display.</p>
    );
  }

  return (
    <>
      {hoveredIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center p-4"
          onMouseEnter={() => {
            if (idleTimerRef.current) {
              clearTimeout(idleTimerRef.current);
              idleTimerRef.current = null;
            }
          }}
          onMouseLeave={() => {
            if (hoveredIndex !== null) {
              onHoverEnd(hoveredIndex);
            }
          }}
          onTouchStart={() => {
            if (idleTimerRef.current) {
              clearTimeout(idleTimerRef.current);
              idleTimerRef.current = null;
            }
          }}
          onTouchEnd={() => {
            if (hoveredIndex !== null) {
              onHoverEnd(hoveredIndex);
            }
          }}
          onTouchCancel={() => {
            if (hoveredIndex !== null) {
              onHoverEnd(hoveredIndex);
            }
          }}
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

      <div
        ref={carouselRef}
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
