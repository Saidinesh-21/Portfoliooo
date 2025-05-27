import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MediaItem } from '../types';
import MediaRenderer from './MediaRenderer';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface CarouselProps {
  media: MediaItem[];
}

interface CarouselSlideItemProps {
  item: MediaItem;
  itemsToShow: number;
}

const CarouselSlideItem: React.FC<CarouselSlideItemProps> = React.memo(({ item, itemsToShow }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-full flex-shrink-0 transition-all duration-300 ease-in-out group/slide"
      style={{ width: `calc(100% / ${itemsToShow})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="group"
      aria-roledescription="slide"
    >
      <div
        className={`w-full h-full p-0.5 sm:p-1 transition-transform duration-300 ease-in-out ${
          isHovered ? 'scale-105 z-20' : 'z-10'
        }`}
      >
        <MediaRenderer mediaItem={item} className="w-full h-full object-cover rounded-md" />
      </div>
      {isHovered && item.description && (
        <div
          className={`absolute bottom-0 left-0 right-0 p-1 sm:p-2 bg-[#22223b]/90 text-[#f2e9e4] text-xs rounded-b-md mx-0.5 sm:mx-1 font-['Roboto Mono'] opacity-100 transition-opacity duration-300 z-30`}
          style={{ transformOrigin: 'bottom', bottom: '0.125rem' }}
        >
          {item.description}
        </div>
      )}
    </div>
  );
});

const Carousel: React.FC<CarouselProps> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.max(0, media.length - itemsToShow))
    );
  }, [media.length, itemsToShow]);

  useEffect(() => {
    const node = carouselRef.current;
    if (!node || media.length <= itemsToShow) return;

    const handleWheel = (event: WheelEvent) => {
      const deltaX = event.deltaX;
      const deltaY = event.deltaY;
      const threshold = 15;
      let scrolledHorizontally = false;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        scrolledHorizontally = true;
        if (deltaX > 0) goToNext();
        else goToPrevious();
      } else if (
        Math.abs(deltaY) > Math.abs(deltaX) &&
        Math.abs(deltaY) > threshold
      ) {
        if (Math.abs(deltaX) < threshold / 2) {
          scrolledHorizontally = true;
          if (deltaY > 0) goToNext();
          else goToPrevious();
        }
      }

      if (scrolledHorizontally) event.preventDefault();
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      node.removeEventListener('wheel', handleWheel);
    };
  }, [goToNext, goToPrevious, media.length, itemsToShow]);

  if (!media || media.length === 0) {
    return (
      <p className="text-[#c9ada7] p-4 text-center font-['Roboto Mono']">
        No media to display.
      </p>
    );
  }

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < media.length - itemsToShow;

  return (
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
  );
};

export default Carousel;