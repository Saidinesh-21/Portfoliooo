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
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const CarouselSlideItem: React.FC<CarouselSlideItemProps> = ({
  item,
  itemsToShow,
  onHoverStart,
  onHoverEnd,
}) => {
  return (
    <div
      className="relative h-full flex-shrink-0 flex justify-center items-center cursor-pointer"
      style={{ width: `calc(100% / ${itemsToShow})` }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onTouchStart={onHoverStart}
      onTouchEnd={onHoverEnd}
      onTouchCancel={onHoverEnd}
      role="group"
      aria-roledescription="slide"
    >
      <div className="w-full h-full p-0.5 sm:p-1 rounded-md transition-transform duration-300 ease-in-out hover:scale-105 flex justify-center items-center">
        <MediaRenderer
          mediaItem={item}
          className="max-w-full max-h-full object-contain rounded-md"
        />
      </div>
    </div>
  );
};

const Carousel: React.FC<CarouselProps> = ({ media }) => {
  const [itemsToShow, setItemsToShow] = useState(3);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const hoverModalRef = useRef<HTMLDivElement>(null);

  // Start hover timer to show modal after 1s
  const startHoverTimer = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(index);
    }, 1000);
  };

  // Cancel hover timer and close modal
  const cancelHoverTimer = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredIndex(null);
  };

  // Prevent modal flicker by keeping it open while mouse is over modal or carousel
  const handleModalMouseLeave = (e: React.MouseEvent) => {
    // Check if mouse actually left modal and not entered child elements
    if (!hoverModalRef.current?.contains(e.relatedTarget as Node)) {
      cancelHoverTimer();
    }
  };

  const handleCarouselMouseLeave = (e: React.MouseEvent) => {
    // Only close modal if mouse not entering modal
    if (!hoverModalRef.current?.contains(e.relatedTarget as Node)) {
      cancelHoverTimer();
    }
  };

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

  useEffect(() => {
    if (currentIndex > Math.max(0, media.length - itemsToShow)) {
      setCurrentIndex(Math.max(0, media.length - itemsToShow));
    }
  }, [itemsToShow, media.length, currentIndex]);

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
      {/* Centered modal preview with blurred background */}
      {hoveredIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-md flex flex-col items-center justify-center p-6"
          onMouseLeave={handleModalMouseLeave}
          onTouchEnd={cancelHoverTimer}
          onTouchCancel={cancelHoverTimer}
          role="dialog"
          aria-modal="true"
          aria-label="Media preview"
          ref={hoverModalRef}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-[80vw] max-h-[80vh] flex flex-col items-center animate-fadeIn">
            <div className="flex-shrink-0 max-w-full max-h-[70vh]">
              <MediaRenderer
                mediaItem={media[hoveredIndex]}
                className="max-w-full max-h-[70vh] object-contain rounded-md"
              />
            </div>
            {media[hoveredIndex].description && (
              <div className="mt-4 text-gray-900 font-['Roboto Mono'] text-center max-w-[90%] select-text">
                {media[hoveredIndex].description}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Carousel */}
      <div
        className="relative w-full aspect-[16/9] group/carousel overflow-hidden select-none"
        role="region"
        aria-label="Media carousel"
        onMouseLeave={handleCarouselMouseLeave}
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
              onHoverStart={() => startHoverTimer(index)}
              onHoverEnd={cancelHoverTimer}
            />
          ))}
        </div>

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
      </div>
    </>
  );
};

export default Carousel;
