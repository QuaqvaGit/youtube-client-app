import { createAction, props } from '@ngrx/store';
import { Video } from 'src/app/youtube/models/video.model';

export const loadYoutubeVideos = createAction('[Youtube API] Videos load');

export const loadYoutubeVideosSuccess = createAction(
  '[Youtube API] Videos loaded success',
  props<{ videos: Video[] }>(),
);
