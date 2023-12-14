import { AppState } from '../state.model';

const selectFavoriteVideos = (state: AppState) =>
  Object.values(state.videos.favoriteVideos);

export default selectFavoriteVideos;
