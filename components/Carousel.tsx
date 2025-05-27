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
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const CarouselSlideItem: React.FC<CarouselSlideItemProps> = ({
  item,
  itemsToShow,
  isHovered,
  onHoverStart,
  onHoverEnd,
}) => {
  return (
    <div
      className="relative h-full flex-shrink-0"
      style={{ width: `calc(100% / ${itemsToShow})` }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      role="group"
      aria-roledescription="slide"
    >
      <div
        className={`w-full h-full p-0.5 sm:p-1 rounded-md transition-transform duration-300 ease-in-out cursor-pointer ${
          isHovered ? 'scale-110 translate-x-[-15%] z-20' : 'z-10'
        }`}
        style={{ transformOrigin: 'center left' }}
      >
        <MediaRenderer mediaItem={item} className="w-full h-full object-cover rounded-md" />
      </div>
    </div>
  );
};

const Carousel: React.FC<CarouselProps> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startHoverTimer = (index: number) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(index);
    }, 1000); // 1 second delay before hover effect
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
    <div className="relative w-full flex">
      {/* Carousel Slides + Description Container */}
      <div
        className="relative w-3/4 aspect-[16/9] overflow-hidden select-none"
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
              isHovered={hoveredIndex === index}
              onHoverStart={() => startHoverTimer(index)}
              onHoverEnd={cancelHoverTimer}
            />
          ))}
        </div>

        {/* Carousel navigation */}
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

      {/* Description panel on right */}
      <div className="w-1/4 pl-6 flex items-center">
        {hoveredIndex !== null && media[hoveredIndex]?.description && (
          <div className="bg-[#22223b]/90 p-4 rounded-md font-['Roboto Mono'] text-[#f2e9e4] shadow-lg max-w-xs">
            {media[hoveredIndex].description}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
