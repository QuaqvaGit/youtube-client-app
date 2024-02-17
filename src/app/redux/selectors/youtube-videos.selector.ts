import { AppState } from '../state.model';

const selectYoutubeVideos = (state: AppState) =>
  state.videos.youtubeVideoIds.map((id) => state.videos.videos[id]);

export default selectYoutubeVideos;
