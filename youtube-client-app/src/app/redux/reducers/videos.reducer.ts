import { createReducer, on } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Video } from 'src/app/youtube/models/video.model';
import { AppState, initialState } from '../state.model';

import addCustomVideo from '../actions/add-custom-video.action';
import deleteCustomVideo from '../actions/delete-custom-video.action';
import addToFavorites from '../actions/add-to-favorites.action';
import removeFromFavorites from '../actions/remove-from-favorites.action';
import { loadYoutubeVideosSuccess } from '../actions/load-youtube-videos.action';
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

const loadYoutubeVideosHandler = (
  state: AppState,
  payload: {
    videos: Video[];
  } & TypedAction<'[Youtube API] Videos loaded success'> & {
      type: '[Youtube API] Videos loaded success';
    },
): AppState => {
  const { customVideoIds } = state;
  const { videos } = payload;

  const newVideos: { [videoId: string]: Video } = {};

  videos.forEach((video) => {
    newVideos[video.id] = video;
  });
  customVideoIds.forEach((id) => {
    newVideos[id] = state.videos[id];
  });
  return {
    videos: newVideos,
    customVideoIds: state.customVideoIds,
    youtubeVideoIds: videos.map((video) => video.id),
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
  on(loadYoutubeVideosSuccess, loadYoutubeVideosHandler),
  on(deleteCustomVideo, deleteCustomVideoHandler),
  on(clearVideos, clearYoutubeVideosHandler),
  on(addToFavorites, addToFavoritesHandler),
  on(removeFromFavorites, removeFromFavoritesHandler),
);
export default videosReducer;
