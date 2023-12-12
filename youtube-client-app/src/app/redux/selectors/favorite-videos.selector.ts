import { AppState } from '../state.model';

const selectFavoriteVideos = (state: AppState) =>
  state.videos.youtubeVideoIds
    .map((id) => state.videos.videos[id])
    .filter((video) => video.isFavorite);

export default selectFavoriteVideos;
