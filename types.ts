export enum MediaType {
  Image = 'IMAGE',
  YouTubeVideo = 'YOUTUBE_VIDEO',
  InstagramReel = 'INSTAGRAM_REEL',
  GenericVideo = 'GENERIC_VIDEO',
}

export interface MediaItem {
  type: 'image' | 'video' | 'beforeAfter' | string; // Add all types you use
  src?: string;
  beforeSrc?: string;
  afterSrc?: string;
  altText?: string;
  description?: string;
}


export interface TimelineEventData {
  id: string;
  date: string;
  title: string;
  category: string;
  description: string;
  eventProfileImageUrl: string;
  media: MediaItem[];
}
