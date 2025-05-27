import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MediaItem } from '../types';
import MediaRenderer from './MediaRenderer';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './icons';

interface CarouselProps {
  media: MediaItem[];
}

interface CarouselSlideItemProps {
  item: MediaItem;
  itemsToShow: number;
}

const CarouselSlideItem: React.FC<CarouselSlideItemProps> = React.memo(({ item, itemsToShow }) => {
  const [showPreview, setShowPreview] = useState(false);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startHoldTimer = () => {
    holdTimeoutRef.current = setTimeout(() => {
      setShowPreview(true);
    }, 1500); // 1.5 sec hold to show preview
  };

  const cancelHoldTimer = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  };

  // Cancel timer and close preview on mouse/touch end or leave
  const handleCancel = () => {
    cancelHoldTimer();
    setShowPreview(false);
  };

  // Close modal when clicking outside content
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowPreview(false);
        cancelHoldTimer();
      }
    };
    if (showPreview) {
      document.addEventListener('mousedown', onClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.removeEventListener('mousedown', onClickOutside);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.body.style.overflow = '';
    };
  }, [showPreview]);

  return (
    <div
      className="relative h-full flex-shrink-0"
      style={{ width: `calc(100% / ${itemsToShow})` }}
      onMouseDown={startHoldTimer}
      onMouseUp={handleCancel}
      onMouseLeave={handleCancel}
      onTouchStart={startHoldTimer}
      onTouchEnd={handleCancel}
      onTouchCancel={handleCancel}
      role="group"
      aria-roledescription="slide"
    >
      <div className="w-full h-full p-0.5 sm:p-1 transition-transform duration-300 ease-in-out rounded-md cursor-pointer">
        <MediaRenderer mediaItem={item} className="w-full h-full object-cover rounded-md" />
      </div>

      {/* Fullscreen Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center p-4 overflow-auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div
            ref={modalRef}
            className="relative max-w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <MediaRenderer
              mediaItem={item}
              className="max-w-screen max-h-[90vh] object-contain rounded"
              style={{ touchAction: 'auto' }}
            />
            <button
              aria-label="Close preview"
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-60 rounded-full p-2 hover:bg-opacity-80 transition"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
            {item.description && (
              <p className="mt-4 text-white text-center font-['Roboto Mono'] max-w-md">
                {item.description}
              </p>
            )}
          </div>
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
