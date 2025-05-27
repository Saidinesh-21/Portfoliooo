import React from 'react';
import { TimelineEventData, MediaType } from '../types';
import { PhotoIcon, YouTubeIcon, VideoCameraIcon } from './icons';
import Carousel from './Carousel';

interface TimelineCardProps {
  event: TimelineEventData;
  dotOffsetFromCardEdgePx: number;
}

const CategoryIconComponent: React.FC<{ category: string; type: MediaType }> = ({
  category,
  type,
}) => {
  const baseClasses = "w-5 h-5 mr-2 text-gray-400"; // grayscale accent for icons
  if (type === MediaType.YouTubeVideo) return <YouTubeIcon className={baseClasses} />;
  if (type === MediaType.Image) return <PhotoIcon className={baseClasses} />;
  if (type === MediaType.GenericVideo || type === MediaType.InstagramReel)
    return <VideoCameraIcon className={baseClasses} />;

  // Fallback based on category string
  if (category.toLowerCase().includes('youtube')) return <YouTubeIcon className={baseClasses} />;
  if (category.toLowerCase().includes('photo')) return <PhotoIcon className={baseClasses} />;
  return <VideoCameraIcon className={baseClasses} />;
};

const TimelineCard: React.FC<TimelineCardProps> = React.memo(({ event, dotOffsetFromCardEdgePx }) => {
  const { id, date, title, category, description, eventProfileImageUrl, media } = event;
  const primaryMediaType = media.length > 0 ? media[0].type : MediaType.Image;

  return (
    <div id={id} className="relative group">
      <div
        className="absolute w-4 h-4 rounded-full bg-gray-400 border-2 border-black z-10" // grayscale dot & black border
        style={{
          left: `-${dotOffsetFromCardEdgePx}px`,
          top: '0.5rem',
          transform: 'translateX(-50%)',
        }}
        aria-hidden="true"
      ></div>

      <div
        className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 transform transition-all duration-300 ease-in-out group-hover:shadow-gray-400/30 group-hover:scale-[1.02]"
        aria-labelledby={`event-title-${id}`}
      >
        <div className="flex items-start mb-4">
          <img
            src={eventProfileImageUrl}
            alt={`Profile image for ${title}`}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-4 border-2 border-gray-400 object-cover flex-shrink-0 group-hover:scale-110 transition-transform duration-200 ease-in-out"
            loading="lazy"
          />
          <div className="flex-grow">
            <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-['Roboto Mono']">
              {date}
            </p>
            <h3
              id={`event-title-${id}`}
              className="text-xl sm:text-2xl font-bold font-heading text-black mb-1"
            >
              {title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 font-['Roboto Mono']">
              <CategoryIconComponent category={category} type={primaryMediaType} />
              <span>{category}</span>
            </div>
          </div>
        </div>

        {media && media.length > 0 && (
          <div className="mb-4 rounded-lg overflow-hidden border border-gray-300/50">
            <Carousel media={media} />
          </div>
        )}

        <p className="text-sm text-black font-['Roboto Mono'] leading-relaxed">{description}</p>
      </div>
    </div>
  );
});

export default TimelineCard;
