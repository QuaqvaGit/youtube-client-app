import { createAction, props } from '@ngrx/store';

const removeFromFavorites = createAction(
  '[Main page] Remove from favorites',
  props<{ id: string }>(),
);
export default removeFromFavorites;
