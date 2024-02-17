import { AppState } from '../state.model';

const selectCustomId = (state: AppState) =>
  state.videos.customVideoIds.length
    ? (+state.videos.customVideoIds.at(-1)! + 1).toString()
    : '0';

export default selectCustomId;
