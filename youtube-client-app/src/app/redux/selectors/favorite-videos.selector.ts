import { AppState } from '../state.model';

const selectAllVideos = (state: AppState) =>
  state.youtubeVideoIds
    .map((id) => state.videos[id])
    .filter((video) => video.isFavorite);

export default selectAllVideos;
