import React from 'react';
import { TimelineEventData } from '../types';
import TimelineCard from './TimelineCard';

interface TimelineProps {
  events: TimelineEventData[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <p className="text-center text-gray-400 py-10 font-['Roboto Mono']">
        No events to display.
      </p>
    );
  }

  const linePositionPx = 20;
  const contentMarginFromLinePx = 20;

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="relative">
        <div
          className="absolute w-1 bg-gray-400 top-0 bottom-0 rounded-full"
          style={{ left: `${linePositionPx}px` }}
          aria-hidden="true"
        ></div>

        <div
          className="space-y-10"
          style={{ marginLeft: `${linePositionPx + contentMarginFromLinePx}px` }}
        >
          {events.map((event) => (
            <TimelineCard
              key={event.id}
              event={event}
              dotOffsetFromCardEdgePx={contentMarginFromLinePx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
