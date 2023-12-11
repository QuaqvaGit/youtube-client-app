import { AppState } from '../state.model';

const selectAllVideos = (state: AppState) => {
  const customVideos = state.customVideoIds.map((id) => state.videos[id]);
  const youtubeVideos = state.youtubeVideoIds.map((id) => state.videos[id]);
  return customVideos.concat(...youtubeVideos);
};
export default selectAllVideos;
