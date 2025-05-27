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
  onClick: () => void; // handler when image clicked
}

const CarouselSlideItem: React.FC<CarouselSlideItemProps> = React.memo(({ item, itemsToShow, onClick }) => {
  return (
    <div
      className="relative h-full flex-shrink-0 cursor-pointer"
      style={{ width: `calc(100% / ${itemsToShow})` }}
      onClick={onClick}
      role="group"
      aria-roledescription="slide"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
    >
      <div className="w-full h-full p-0.5 sm:p-1 transition-transform duration-300 ease-in-out rounded-md hover:scale-105">
        <MediaRenderer mediaItem={item} className="w-full h-full object-cover rounded-md" />
      </div>
      {item.description && (
        <div
          className="absolute bottom-0 left-0 right-0 p-1 sm:p-2 bg-[#22223b]/90 text-[#f2e9e4] text-xs rounded-b-md mx-0.5 sm:mx-1 font-['Roboto Mono'] opacity-100"
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
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Close modal on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setPreviewIndex(null);
        document.body.style.overflo
