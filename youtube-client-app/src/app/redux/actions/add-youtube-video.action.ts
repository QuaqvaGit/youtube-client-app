import { createAction, props } from '@ngrx/store';
import { Video } from 'src/app/youtube/models/video.model';

const addYoutubeVideo = createAction(
  '[Main page] Add youtube video',
  props<{ video: Video }>(),
);
export default addYoutubeVideo;
