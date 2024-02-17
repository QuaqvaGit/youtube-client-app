import { createAction, props } from '@ngrx/store';
import { Video } from 'src/app/youtube/models/video.model';

const addCustomVideo = createAction(
  '[Admin page] Add custom video',
  props<{ video: Video }>(),
);
export default addCustomVideo;
