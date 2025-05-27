import React, { useState, useEffect, useRef } from 'react';
import { MediaItem } from '../types';
import MediaRenderer from './MediaRenderer';

interface CarouselProps {
  media: MediaItem[];
}

const Carousel: React.FC<CarouselProps> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const startHover = (index: number) => setHoveredIndex(index);
  const endHover = () => setHoveredIndex(null);

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out">
        {media.map((item, index) => (
          <div
            key={item.src + index}
            className="relative h-full flex-shrink-0 cursor-pointer transition-all duration-300"
            onMouseEnter={() => startHover(index)}
            onMouseLeave={endHover}
            style={{
              width: 'calc(100% / 3)', // Adjust items per row
            }}
          >
            <MediaRenderer
              mediaItem={item}
              className="w-full h-full object-cover"
            />
            {hoveredIndex === index && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  {item.description}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
