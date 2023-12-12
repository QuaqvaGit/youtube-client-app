import { AppState } from '../state.model';

const selectAllVideos = (state: AppState) => {
  const customVideos = state.videos.customVideoIds.map(
    (id) => state.videos.videos[id],
  );
  const youtubeVideos = state.videos.youtubeVideoIds.map(
    (id) => state.videos.videos[id],
  );
  return customVideos.concat(...youtubeVideos);
};

export default selectAllVideos;
