export enum MediaType {
  Image = 'IMAGE',
  YouTubeVideo = 'YOUTUBE_VIDEO',
  InstagramReel = 'INSTAGRAM_REEL',
  GenericVideo = 'GENERIC_VIDEO',
}

export interface MediaItem {
  type: MediaType;
  src: string;
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
