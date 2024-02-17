import { VideoStatistics } from './search-item.model';

export type Video = {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  videoUrl: string;
  publishDate: string;
  tags: string[];
  isFavorite?: boolean;
  statistics?: VideoStatistics;
};
