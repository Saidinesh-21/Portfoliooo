import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { MediaItem } from '../types';
import MediaRenderer from './MediaRenderer';

// ... rest of CarouselSlideItem and Carousel code unchanged

const Carousel: React.FC<CarouselProps> = ({ media }) => {
  // ... all your existing state and refs

  // Function to close the modal
  const closeModal = useCallback(() => {
    setHoveredIndex(null);
    currentHoverIndexRef.current = null;
  }, []);

  // Close modal on clicking outside or pressing Escape
  useEffect(() => {
    if (hoveredIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }

    function handleClickOutside(event: MouseEvent) {
      // Check if click is outside modal content
      const modalContent = document.getElementById('modal-content');
      if (modalContent && !modalContent.contains(event.target as Node)) {
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

  const modalRoot = document.getElementById('modal-root');

  return (
    <>
      {hoveredIndex !== null && modalRoot
        ? ReactDOM.createPortal(
            <div
              className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center p-4"
              // remove onMouseEnter/onMouseLeave because we handle outside clicks
            >
              <div
                id="modal-content"
                className="bg-white rounded-lg shadow-lg p-6 max-w-[80vw] max-h-[90vh] flex flex-col items-center transition-all duration-500 ease-in-out overflow-hidden"
              >
                <div className="flex-shrink-0 max-w-full max-h-[76vh]">
                  <MediaRenderer
                    mediaItem={media[hoveredIndex]}
                    className="object-contain rounded-md"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      height: 'auto',
                      width: 'auto',
                    }}
                  />
                </div>
                {media[hoveredIndex].description && (
                  <div className="mt-4 text-gray-900 font-['Roboto Mono'] text-center max-w-[90%]">
                    {media[hoveredIndex].description}
                  </div>
                )}
              </div>
            </div>,
            modalRoot
          )
        : null}

      {/* ... rest of your carousel code unchanged */}
    </>
  );
};

export default Carousel;
