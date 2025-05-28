import React, { useState } from 'react';
import { TimelineEventData } from '../types';
import TimelineCard from './TimelineCard';

interface TimelineProps {
  events: TimelineEventData[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!events || events.length === 0) {
    return (
      <p className="text-center text-[#c9ada7] py-10 font-['Roboto Mono']">No events to display.</p>
    );
  }

  const totalEvents = events.length;

  const goToPrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () => setCurrentIndex((prev) => Math.min(totalEvents - 1, prev + 1));

  return (
    <div
      className="mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 pt-16 sm:pt-20 pb-8 sm:pb-12 max-w-screen-xl"
      style={{ boxSizing: 'border-box' }}
    >
      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute w-1 bg-[#9a8c98] rounded-full top-0 bottom-0 left-[40px]"
          aria-hidden="true"
        ></div>

        {/* One timeline card at a time */}
        <div className="overflow-hidden">
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${currentIndex * 100}%)` }}
          >
            {events.map((event) => (
              <div key={event.id} className="mb-10">
                <TimelineCard event={event} dotOffsetFromCardEdgePx={40} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded bg-[#9a8c98] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous timeline event"
          >
            Prev
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === totalEvents - 1}
            className="px-4 py-2 rounded bg-[#9a8c98] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next timeline event"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
