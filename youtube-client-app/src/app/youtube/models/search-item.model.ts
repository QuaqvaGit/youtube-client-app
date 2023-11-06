export type SearchItem = {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippet;
  statistics: VideoStatistics;
};

export type VideoStatistics = {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
};

type VideoSnippet = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: VideoThumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: VideoLocalizationInfo;
  defaultAudioLanguage: string;
};

type VideoThumbnails = {
  default: VideoThumbnail;
  medium: VideoThumbnail;
  high: VideoThumbnail;
  standard: VideoThumbnail;
  maxres: VideoThumbnail;
};

type VideoThumbnail = {
  url: string;
  width: number;
  height: number;
};

type VideoLocalizationInfo = {
  title: string;
  description: string;
};
