import { Video } from '../youtube/models/video.model';

export type AppState = {
  videos: { [videoId: string]: Video };
  customVideoIds: string[];
  youtubeVideoIds: string[];
};

export const initialState: AppState = {
  videos: {},
  customVideoIds: [],
  youtubeVideoIds: [],
};
