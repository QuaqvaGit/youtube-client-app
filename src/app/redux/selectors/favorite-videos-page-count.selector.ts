import { AppState } from '../state.model';

const selectFavoritesPageCount = (state: AppState) =>
  Math.ceil(Object.keys(state.videos.favoriteVideos).length / 20);

export default selectFavoritesPageCount;
