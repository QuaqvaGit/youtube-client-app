import { createAction, props } from '@ngrx/store';

const deleteVideo = createAction(
  '[Main page] Delete custom video',
  props<{ id: string }>(),
);
export default deleteVideo;
