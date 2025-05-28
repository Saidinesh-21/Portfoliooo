import React from 'react';
import { TimelineEventData } from '../types';
import TimelineCard from './TimelineCard';

interface TimelineProps {
  events: TimelineEventData[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <p className="text-center text-[#c9ada7] py-10 font-['Roboto Mono']">
        No events to display.
      </p>
    );
  }

  return (
    <div
      className="container mx-auto max-w-[1024px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      style={{ boxSizing: 'border-box', height: '80vh' }}
    >
      <div className="relative h-full flex flex-col overflow-y-auto no-scrollbar">
        {/* Vertical timeline line */}
        <div
          className="absolute w-1 bg-[#9a8c98] rounded-full top-0 bottom-0 left-[40px]"
          aria-hidden="true"
        />

        {/* Timeline cards stacked vertically */}
        <div className="flex flex-col space-y-10 mt-2">
          {events.map((event) => (
            <div key={event.id} className="min-h-[500px]">
              <TimelineCard event={event} dotOffsetFromCardEdgePx={40} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
