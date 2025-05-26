
import React from 'react';
import { MediaItem, MediaType } from '../types';

interface MediaRendererProps {
  mediaItem: MediaItem;
  className?: string; // Base className for the wrapper/media element itself
}

const MediaRenderer: React.FC<MediaRendererProps> = React.memo(({ mediaItem, className = "" }) => {
  switch (mediaItem.type) {
    case MediaType.Image:
      return (
        <img
          src={mediaItem.src}
          alt={mediaItem.altText || 'Portfolio image'}
          className={`w-full h-full object-cover ${className}`} // Use object-cover to fill and crop
          loading="lazy"
        />
      );
    case MediaType.YouTubeVideo:
      return (
        <iframe
          src={mediaItem.src}
          title={mediaItem.altText || "YouTube video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={`w-full h-full ${className}`} // YouTube iframe should fill its container
        ></iframe>
      );
    case MediaType.GenericVideo:
    case MediaType.InstagramReel: 
      return (
        <video
          src={mediaItem.src}
          controls
          className={`w-full h-full object-cover ${className}`} // Use object-cover for generic videos
        >
          Your browser does not support the video tag.
        </video>
      );
    default:
      return <p className="text-slate-400 p-4">Unsupported media type</p>;
  }
});

export default MediaRenderer;