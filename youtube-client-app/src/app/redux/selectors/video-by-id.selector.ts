import { AppState } from '../state.model';

const selectVideoById = (id: string) => (state: AppState) =>
  state.videos.videos[id] || state.videos.favoriteVideos[id];

export default selectVideoById;
