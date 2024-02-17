import { createAction, props } from '@ngrx/store';

const addToFavorites = createAction(
  '[Main page] Add to favorites',
  props<{ id: string }>(),
);
export default addToFavorites;
