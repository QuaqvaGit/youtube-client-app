import { AppState } from '../state.model';

const selectFullVideosPageCount = (state: AppState) =>
  Math.ceil(
    (state.videos.customVideoIds.length + state.videos.youtubeVideoIds.length) /
      20,
  );

export default selectFullVideosPageCount;
