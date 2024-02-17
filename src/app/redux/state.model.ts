// eslint-disable-next-line import/no-cycle
import { VideosState } from './reducers/videos.reducer';

export type AppState = {
  videos: VideosState;
};
