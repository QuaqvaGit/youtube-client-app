import { createAction, props } from '@ngrx/store';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import { Video } from 'src/app/youtube/models/video.model';

export const loadYoutubeVideos = createAction(
  '[Youtube API] Videos load',
  props<{ searchParams: SearchParams }>(),
);

export const loadYoutubeVideosSuccess = createAction(
  '[Youtube API] Videos loaded success',
  props<{ videos: Video[] }>(),
);
