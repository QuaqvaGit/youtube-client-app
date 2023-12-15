import { AppState } from '../state.model';

const selectCustomVideos = (state: AppState) =>
  state.videos.customVideoIds.map((id) => state.videos.videos[id]);

export default selectCustomVideos;
