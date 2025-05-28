import React, { useState, useRef, useEffect } from 'react';
import { MediaItem } from '../types';
import MediaRenderer from './MediaRenderer';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

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
      onClick={() => onHoverStart(index)}  // Added click event for hover effect
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
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentHoverIndexRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const scrollDirectionRef = useRef(1); // 1 for right, -1 for left
  const isScrollingRef = useRef<boolean>(false);  // Track if scrolling is in progress

  const [currentIndex, setCurrentIndex] = useState(0);

  // Hover handlers with idle and close timers
  const onHoverStart = (index: number) => {
    if (isScrollingRef.current) return;  // Prevent starting the timer if scrolling is in progress

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    currentHoverIndexRef.current = index;
    idleTimerRef.current = setTimeout(() => {
      setHoveredIndex(index);
    }, 1250);  // Adjust time as needed
  };

  const onHoverEnd = (index: number) => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    closeTimerRef.current = setTimeout(() => {
      setHoveredIndex((current) => (current === index ? null : current));
      closeTimerRef.current = null;
      currentHoverIndexRef.current = null;
    }, 200);
  };

  const onModalMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const onModalMouseLeave = () => {
    if (hoveredIndex !== null) {
      closeTimerRef.current = setTimeout(() => {
        setHoveredIndex(null);
        currentHoverIndexRef.current = null;
        closeTimerRef.current = null;
      }, 200);
    }
  };

  // Responsive items to show
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

  // Adjust currentIndex if it goes beyond range
  useEffect(() => {
    if (currentIndex > Math.max(0, media.length - itemsToShow)) {
      setCurrentIndex(Math.max(0, media.length - itemsToShow));
    }
  }, [itemsToShow, media.length, currentIndex]);

  // Mouse wheel horizontal scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Horizontal scroll detected
        e.preventDefault();
        isScrollingRef.current = true;  // Mark scrolling as in progress

        let newIndex = currentIndex;
        if (e.deltaX > 0) {
          newIndex = Math.min(currentIndex + 1, media.length - itemsToShow);
        } else {
          newIndex = Math.max(currentIndex - 1, 0);
        }
        setCurrentIndex(newIndex);

        // Reset auto-scroll on user interaction
        resetAutoScroll();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [currentIndex, itemsToShow, media.length]);

  // Reset isScrollingRef after a delay to allow for scrolling to stop
  useEffect(() => {
    if (isScrollingRef.current) {
      const scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;  // Reset scrolling state after 300ms
      }, 1300);

      return () => clearTimeout(scrollTimeout);  // Clear timeout on unmount or when scrolling stops
    }
  }, [currentIndex]);

  // Auto-scroll function
  const autoScroll = () => {
    setCurrentIndex((prev) => {
      let nextIndex = prev + scrollDirectionRef.current;
      if (nextIndex > media.length - itemsToShow) {
        scrollDirectionRef.current = -1;
        nextIndex = prev - 1;
      } else if (nextIndex < 0) {
        scrollDirectionRef.current = 1;
        nextIndex = prev + 1;
      }
      return nextIndex;
    });
  };

  // Reset auto-scroll timer on user interaction
  const resetAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(autoScroll, 3000);
  };

  // Start auto-scroll on mount
  useEffect(() => {
    resetAutoScroll();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [media.length, itemsToShow]);

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
          onMouseLeave={onModalMouseLeave}
          onTouchStart={onModalMouseEnter}
          onTouchEnd={onModalMouseLeave}
          onTouchCancel={onModalMouseLeave}
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
        ref={containerRef}
        className="relative w-full aspect-[16/9] group/carousel overflow-hidden select-none"
        role="region"
        aria-label="Media carousel"
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out gap-x-3"
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
