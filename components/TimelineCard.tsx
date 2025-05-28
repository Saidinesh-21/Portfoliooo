import React from 'react';
import { TimelineEventData } from '../types';
import Carousel from './Carousel';

interface TimelineCardProps {
  event: TimelineEventData;
  dotOffsetFromCardEdgePx: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ event, dotOffsetFromCardEdgePx }) => {
  // Check if event is the special "Mastering Lightroom & Photoshop (Before & After)"
  const isBeforeAfterEvent = event.title === 'Mastering Lightroom & Photoshop (Before & After)';

  return (
    <div className="relative flex items-start gap-6">
      {/* Dot and vertical connector line */}
      <div
        className="absolute left-0 top-0 w-[2px] bg-[#9a8c98]"
        style={{ height: '100%', left: dotOffsetFromCardEdgePx }}
      />
      <span
        className="block w-5 h-5 rounded-full bg-[#9a8c98] absolute"
        style={{ left: dotOffsetFromCardEdgePx - 6, top: 10 }}
        aria-hidden="true"
      />

      {/* Event content */}
      <div className="ml-12 max-w-xl">
        <h3 className="text-xl font-semibold font-heading mb-1">{event.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{event.date}</p>
        <p className="text-gray-700 font-['Roboto Mono'] mb-4 whitespace-pre-wrap">{event.description}</p>

        {/* Conditional carousel render */}
        {isBeforeAfterEvent ? (
          // Pass flag or handle in Carousel to do before/after logic
          <Carousel media={event.media} eventName={event.title} isBeforeAfter />
        ) : (
          <Carousel media={event.media} eventName={event.title} />
        )}
      </div>
    </div>
  );
};

export default TimelineCard;
