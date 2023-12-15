import { AppState } from '../state.model';
import selectAllVideos from './full-videos.selector';

const selectFullVideosPageCount = (state: AppState) =>
  Math.ceil(selectAllVideos(state).length / 20);

export default selectFullVideosPageCount;
