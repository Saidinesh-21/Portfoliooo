import React, { useState, useRef } from 'react';
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
      className="relative h-full flex-shrink-0 cursor-pointer"
      style={{ width: `calc(100% / ${itemsToShow})` }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onTouchStart={onHoverStart}
      onTouchEnd={onHoverEnd}
      onTouchCancel={onHoverEnd}
      role="group"
      aria-roledescription="slide"
    >
      <div className="w-full h-full p-0.5 sm:p-1 rounded-md transition-transform duration-300 ease-in-out hover:scale-105">
        <MediaRenderer mediaItem={item} className="w-full h-full object-cover rounded-md" />
      </div>
    </div>
  );
};

const Carousel: React.FC<CarouselProps> = ({ media }) => {
  const [itemsToShow, setItemsToShow] = useState(3);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startHoverTimer = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(index);
    }, 1000);
  };

  const cancelHoverTimer = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredIndex(null);
  };

  React.useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  React.useEffect(() => {
    if (currentIndex > Math.max(0, media.length - itemsToShow)) {
      setCurrentIndex(Math.max(0, media.length - itemsToShow));
    }
  }, [itemsToShow, media.length, currentIndex]);

  const goToPrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, Math.max(0, media.length - itemsToShow)));

  if (!media || media.length === 0) {
    return (
      <p className="text-[#c9ada7] p-4 text-center font-['Roboto Mono']">No media to display.</p>
    );
  }

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < media.length - itemsToShow;

  return (
    <>
      {/* Left-side fixed preview */}
      {hoveredIndex !== null && (
        <div
          className="fixed top-1/2 left-4 z-[9999] flex max-w-[600px] max-h-[90vh] flex-col bg-[#22223b]/95 rounded-lg shadow-lg p-4 transform -translate-y-1/2"
          onMouseLeave={cancelHoverTimer}
          onTouchEnd={cancelHoverTimer}
          onTouchCancel={cancelHoverTimer}
        >
          <div className="flex-shrink-0 max-w-[600px] max-h-[70vh]">
            <MediaRenderer
              mediaItem={media[hoveredIndex]}
              className="max-w-full max-h-[70vh] object-contain rounded-md"
            />
          </div>
          {media[hoveredIndex].description && (
            <div className="mt-4 text-[#f2e9e4] font-['Roboto Mono'] text-center">
              {media[hoveredIndex].description}
            </div>
          )}
        </div>
      )}

      {/* Carousel */}
      <div
        className="relative w-full aspect-[16/9] group/carousel overflow-hidden select-none"
        role="region"
        aria-label="Media carousel"
        onMouseLeave={cancelHoverTimer}
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
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 text-[#f2e9e4] p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 hover:bg-[#4a4e69]/70 focus:bg-[#4a4e69]/70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#9a8c98] z-30 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous group of slides"
            >
              <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={goToNext}
              disabled={!canGoNext}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 text-[#f2e9e4] p-2 rounded-full opacity-0 group-hover/carousel:opacity-100 hover:bg-[#4a4e69]/70 focus:bg-[#4a4e69]/70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#9a8c98] z-30 disabled:opacity-30 disabled:cursor-not-allowed"
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
