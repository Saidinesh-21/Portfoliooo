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
  const lastMousePositionRef = useRef<{ x: number; y: number } | null>(null);
  const currentHoverIndexRef = useRef<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ref for carousel container div to implement wheel scroll & auto scroll
  const carouselRef = useRef<HTMLDivElement | null>(null);
  // Scroll position tracker for auto-scroll
  const scrollPositionRef = useRef(0);
  const autoScrollDirectionRef = useRef(1); // 1 for right, -1 for left
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Hover handlers — unchanged
  const onHoverStart = (index: number) => {
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
    }, 1250);
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
      onHoverEnd(hoveredIndex);
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

  // Clamp currentIndex if itemsToShow or media length changes
  useEffect(() => {
    if (currentIndex > Math.max(0, media.length - itemsToShow)) {
      setCurrentIndex(Math.max(0, media.length - itemsToShow));
    }
  }, [itemsToShow, media.length, currentIndex]);

  // Scroll the carousel on mouse wheel horizontally
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Wheel event handler for horizontal scrolling
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > 0 || Math.abs(e.deltaY) > 0) {
        e.preventDefault();

        // Scroll horizontally based on wheel delta (some trackpads send deltaY for horizontal scroll)
        const scrollAmount = e.deltaY !== 0 ? e.deltaY : e.deltaX;
        carousel.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });

        // Update scrollPositionRef to keep track of scroll (for auto-scroll pause)
        scrollPositionRef.current = carousel.scrollLeft;

        // Pause auto scroll on user interaction
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
          autoScrollIntervalRef.current = null;
        }
      }
    };

    carousel.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      carousel.removeEventListener('wheel', onWheel);
    };
  }, []);

  // Auto-scroll the carousel slowly when no user interaction for 3 seconds
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let lastInteractionTime = Date.now();

    const onUserInteraction = () => {
      lastInteractionTime = Date.now();

      // Clear auto scroll interval on interaction
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };

    carousel.addEventListener('wheel', onUserInteraction);
    carousel.addEventListener('touchstart', onUserInteraction);
    carousel.addEventListener('mousemove', onUserInteraction);

    // Auto-scroll function (runs every 20 ms)
    const autoScrollFn = () => {
      if (!carousel) return;
      const now = Date.now();

      // If no interaction in last 3 seconds, auto-scroll
      if (now - lastInteractionTime > 3000) {
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        if (
          scrollPositionRef.current >= maxScrollLeft
        ) {
          autoScrollDirectionRef.current = -1; // Reverse direction
        } else if (scrollPositionRef.current <= 0) {
          autoScrollDirectionRef.current = 1; // Forward direction
        }

        scrollPositionRef.current += autoScrollDirectionRef.current * 1; // Scroll speed (1 px per tick)
        carousel.scrollLeft = scrollPositionRef.current;
      }
    };

    autoScrollIntervalRef.current = setInterval(autoScrollFn, 20);

    return () => {
      carousel.removeEventListener('wheel', onUserInteraction);
      carousel.removeEventListener('touchstart', onUserInteraction);
      carousel.removeEventListener('mousemove', onUserInteraction);
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };
  }, []);

  const goToPrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, Math.max(0, media.length - itemsToShow)));

  if (!media || media.length === 0) {
    return (
      <p className="text-gray-400 p-4 text-center font-['Roboto Mono']">No media to display.</p>
    );
  }

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < media.length - itemsToShow;

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
        ref={carouselRef}
        className="relative w-full aspect-[16/9] group/carousel overflow-x-auto overflow-y-hidden scrollbar-hide select-none"
        role="region"
        aria-label="Media carousel"
      >
        <div
          className="flex h-full gap-x-3"
          style={{ minWidth: `${(media.length / itemsToShow) * 100}%`, scrollSnapType: 'x mandatory' }}
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

        {/* Commented out arrow buttons since user wants scrolling by wheel */}
        {/* 
        {media.length > itemsToShow && (
          <>
            <button
              onClick={goToPrevious}
              disabled={!canGoPrev}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 text-gray-300 p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 hover:bg-gray-700 focus:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous group of slides"
            >
              <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={goToNext}
              disabled={!canGoNext}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 text-gray-300 p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 hover:bg-gray-700 focus:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next group of slides"
            >
              <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )} 
        */}
      </div>
    </>
  );
};

export default Carousel;
