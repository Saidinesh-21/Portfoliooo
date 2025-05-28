import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
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
}) => (
  <div
    className="relative flex-shrink-0 cursor-pointer"
    style={{ width: `calc(100% / ${itemsToShow})`, height: '100%' }}
    onMouseEnter={() => onHoverStart(index)}
    onMouseLeave={() => onHoverEnd(index)}
    onTouchStart={() => onHoverStart(index)}
    onTouchEnd={() => onHoverEnd(index)}
    onTouchCancel={() => onHoverEnd(index)}
    onClick={() => onHoverStart(index)}
    role="group"
    aria-roledescription="slide"
  >
    <div className="flex items-center justify-center p-0.5 sm:p-1 rounded-md transition-transform duration-300 ease-in-out hover:scale-105 h-full">
      <MediaRenderer
        mediaItem={item}
        className="max-w-full max-h-full object-contain rounded-md"
      />
    </div>
  </div>
);

const Carousel: React.FC<CarouselProps> = ({ media }) => {
  const [itemsToShow, setItemsToShow] = useState(3);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentHoverIndexRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const scrollDirectionRef = useRef(1);
  const isScrollingRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const closeModal = useCallback(() => {
    setHoveredIndex(null);
    currentHoverIndexRef.current = null;
  }, []);

  useEffect(() => {
    if (hoveredIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }

    function handleClickOutside(e: MouseEvent) {
      const modalContent = document.getElementById('modal-content');
      if (modalContent && !modalContent.contains(e.target as Node)) {
        closeModal();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hoveredIndex, closeModal]);

  const onHoverStart = useCallback((index: number) => {
    if (isScrollingRef.current) return;

    closeTimerRef.current && clearTimeout(closeTimerRef.current);
    idleTimerRef.current && clearTimeout(idleTimerRef.current);

    currentHoverIndexRef.current = index;
    idleTimerRef.current = setTimeout(() => {
      setHoveredIndex(index);
    }, 1250);
  }, []);

  const onHoverEnd = useCallback((index: number) => {
    idleTimerRef.current && clearTimeout(idleTimerRef.current);
    idleTimerRef.current = null;

    closeTimerRef.current = setTimeout(() => {
      setHoveredIndex((current) => (current === index ? null : current));
      closeTimerRef.current = null;
      currentHoverIndexRef.current = null;
    }, 200);
  }, []);

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        isScrollingRef.current = true;

        let newIndex = currentIndex;
        if (e.deltaX > 0) newIndex = Math.min(currentIndex + 1, media.length - itemsToShow);
        else newIndex = Math.max(currentIndex - 1, 0);

        setCurrentIndex(newIndex);
        resetAutoScroll();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [currentIndex, itemsToShow, media.length]);

  useEffect(() => {
    if (isScrollingRef.current) {
      const timeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const autoScroll = () => {
    setCurrentIndex((prev) => {
      let next = prev + scrollDirectionRef.current;
      if (next > media.length - itemsToShow) {
        scrollDirectionRef.current = -1;
        next = prev - 1;
      } else if (next < 0) {
        scrollDirectionRef.current = 1;
        next = prev + 1;
      }
      return next;
    });
  };

  const resetAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(autoScroll, 3000);
  };

  useEffect(() => {
    resetAutoScroll();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [media.length, itemsToShow]);

  const modalRoot = document.getElementById('modal-root');

  if (!media || media.length === 0) {
    return (
      <p className="text-gray-400 p-4 text-center font-['Roboto Mono']">
        No media to display.
      </p>
    );
  }

  return (
    <>
      {hoveredIndex !== null && modalRoot
        ? ReactDOM.createPortal(
            <div
              className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center p-4"
              aria-modal="true"
              role="dialog"
              tabIndex={-1}
              onMouseEnter={() => {
                if (closeTimerRef.current) {
                  clearTimeout(closeTimerRef.current);
                  closeTimerRef.current = null;
                }
              }}
              onTouchStart={() => {
                if (closeTimerRef.current) {
                  clearTimeout(closeTimerRef.current);
                  closeTimerRef.current = null;
                }
              }}
            >
              <div
                id="modal-content"
                className="bg-white rounded-lg shadow-lg p-6 max-w-[80vw] max-h-[90vh] flex flex-col items-center transition-all duration-500 ease-in-out overflow-auto"
                onMouseLeave={() => {
                  closeTimerRef.current = setTimeout(() => {
                    setHoveredIndex(null);
                    currentHoverIndexRef.current = null;
                    closeTimerRef.current = null;
                  }, 200);
                }}
                onMouseEnter={() => {
                  if (closeTimerRef.current) {
                    clearTimeout(closeTimerRef.current);
                    closeTimerRef.current = null;
                  }
                }}
                onTouchEnd={() => {
                  closeTimerRef.current = setTimeout(() => {
                    setHoveredIndex(null);
                    currentHoverIndexRef.current = null;
                    closeTimerRef.current = null;
                  }, 200);
                }}
                onTouchCancel={() => {
                  closeTimerRef.current = setTimeout(() => {
                    setHoveredIndex(null);
                    currentHoverIndexRef.current = null;
                    closeTimerRef.current = null;
                  }, 200);
                }}
              >
                <div className="flex-shrink-0 max-w-full max-h-[76vh] border border-white rounded-md overflow-hidden">
                  <MediaRenderer
                    mediaItem={media[hoveredIndex]}
                    className="object-contain rounded-md"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      height: 'auto',
                      width: 'auto',
                      display: 'block',
                    }}
                  />
                </div>

                {media[hoveredIndex].description && (
                  <div className="mt-4 text-black font-['Roboto Mono'] text-center max-w-[90%] whitespace-pre-wrap">
                    {media[hoveredIndex].description}
                  </div>
                )}
              </div>
            </div>,
            modalRoot
          )
        : null}

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
