
export enum MediaType {
  Image = 'IMAGE',
  YouTubeVideo = 'YOUTUBE_VIDEO',
  InstagramReel = 'INSTAGRAM_REEL', // Represented as a generic video
  GenericVideo = 'GENERIC_VIDEO',
}

export interface MediaItem {
  type: MediaType;
  src: string; 
  altText?: string;
  description?: string; // Added for pop-out description in carousel
}

export interface TimelineEventData {
  id: string;
  date: string;
  title: string;
  category: string;
  description: string;
  eventProfileImageUrl: string; // Added: URL for small profile image for this event
  media: MediaItem[];
}
