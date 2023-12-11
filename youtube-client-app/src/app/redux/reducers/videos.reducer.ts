import { createReducer, on } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Video } from 'src/app/youtube/models/video.model';
import { AppState, initialState } from '../state.model';

import addCustomVideo from '../actions/add-custom-video.action';
import deleteCustomVideo from '../actions/delete-custom-video.action';
import addToFavorites from '../actions/add-to-favorites.action';
import removeFromFavorites from '../actions/remove-from-favorites.action';
import addYoutubeVideo from '../actions/add-youtube-video.action';
import clearVideos from '../actions/clear-youtube-videos.action';

const addCustomVideoHandler = (
  state: AppState,
  payload: {
    video: Video;
  } & TypedAction<'[Admin page] Add custom video'> & {
      type: '[Admin page] Add custom video';
    },
): AppState => {
  const { video } = payload;

  return {
    videos: {
      ...state.videos,
      [video.id]: video,
    },
    customVideoIds: state.customVideoIds.concat(video.id),
    youtubeVideoIds: state.youtubeVideoIds,
  };
};

const addYoutubeVideoHandler = (
  state: AppState,
  payload: {
    video: Video;
  } & TypedAction<'[Main page] Add youtube video'> & {
      type: '[Main page] Add youtube video';
    },
): AppState => {
  const { youtubeVideoIds } = state;
  const { video } = payload;

  if (youtubeVideoIds.includes(video.id)) return state;
  return {
    videos: {
      ...state.videos,
      [video.id]: video,
    },
    customVideoIds: state.customVideoIds,
    youtubeVideoIds: state.youtubeVideoIds.concat(video.id),
  };
};

const deleteCustomVideoHandler = (
  state: AppState,
  payload: {
    id: string;
  } & TypedAction<'[Main page] Delete custom video'> & {
      type: '[Main page] Delete custom video';
    },
): AppState => {
  const { customVideoIds, videos } = state;
  const { id } = payload;

  if (!customVideoIds.includes(id)) throw Error('No such video in store');

  const newVideos = structuredClone(videos);
  delete newVideos[id];

  return {
    videos: newVideos,
    customVideoIds: customVideoIds.filter((videoId) => videoId !== id),
    youtubeVideoIds: state.youtubeVideoIds,
  };
};

const clearYoutubeVideosHandler = (state: AppState): AppState => ({
  ...state,
  youtubeVideoIds: [],
});

const addToFavoritesHandler = (
  state: AppState,
  payload: {
    id: string;
  } & TypedAction<'[Main page] Add to favorites'> & {
      type: '[Main page] Add to favorites';
    },
): AppState => {
  const { videos } = state;
  const { id } = payload;

  const video = videos[id];
  if (!video) throw Error("Video with such id can't be added to favorites");

  video.isFavorite = true;

  return state;
};

const removeFromFavoritesHandler = (
  state: AppState,
  payload: {
    id: string;
  } & TypedAction<'[Main page] Remove from favorites'> & {
      type: '[Main page] Remove from favorites';
    },
): AppState => {
  const { videos } = state;
  const { id } = payload;

  const favoriteVideo = videos[id];
  if (!favoriteVideo) throw Error('No such video in favorites');

  favoriteVideo.isFavorite = false;
  return state;
};

const videosReducer = createReducer(
  initialState,
  on(addCustomVideo, addCustomVideoHandler),
  on(addYoutubeVideo, addYoutubeVideoHandler),
  on(deleteCustomVideo, deleteCustomVideoHandler),
  on(clearVideos, clearYoutubeVideosHandler),
  on(addToFavorites, addToFavoritesHandler),
  on(removeFromFavorites, removeFromFavoritesHandler),
);
export default videosReducer;
