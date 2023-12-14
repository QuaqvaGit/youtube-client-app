import { createReducer, on } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Video } from 'src/app/youtube/models/video.model';

import addCustomVideo from '../actions/add-custom-video.action';
import deleteCustomVideo from '../actions/delete-custom-video.action';
import addToFavorites from '../actions/add-to-favorites.action';
import removeFromFavorites from '../actions/remove-from-favorites.action';
import { loadYoutubeVideosSuccess } from '../actions/load-youtube-videos.action';
import clearVideos from '../actions/clear-youtube-videos.action';

const addCustomVideoHandler = (
  state: VideosState,
  payload: {
    video: Video;
  } & TypedAction<'[Admin page] Add custom video'> & {
      type: '[Admin page] Add custom video';
    },
): VideosState => {
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
  state: VideosState,
  payload: {
    videos: Video[];
  } & TypedAction<'[Youtube API] Videos loaded success'> & {
      type: '[Youtube API] Videos loaded success';
    },
): VideosState => {
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
  state: VideosState,
  payload: {
    id: string;
  } & TypedAction<'[Main page] Delete custom video'> & {
      type: '[Main page] Delete custom video';
    },
): VideosState => {
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

const clearYoutubeVideosHandler = (state: VideosState): VideosState => ({
  ...state,
  youtubeVideoIds: [],
});

const addToFavoritesHandler = (
  state: VideosState,
  payload: {
    id: string;
  } & TypedAction<'[Main page] Add to favorites'> & {
      type: '[Main page] Add to favorites';
    },
): VideosState => {
  const { videos } = state;
  const { id } = payload;

  const video = videos[id];
  if (!video) throw Error("Video with such id can't be added to favorites");

  const newVideos = structuredClone(videos);
  newVideos[id].isFavorite = true;

  return {
    ...state,
    videos: newVideos,
  };
};

const removeFromFavoritesHandler = (
  state: VideosState,
  payload: {
    id: string;
  } & TypedAction<'[Main page] Remove from favorites'> & {
      type: '[Main page] Remove from favorites';
    },
): VideosState => {
  const { videos } = state;
  const { id } = payload;

  const favoriteVideo = videos[id];
  if (!favoriteVideo) throw Error('No such video in favorites');

  const newVideos = structuredClone(videos);
  newVideos[id].isFavorite = false;
  return {
    ...state,
    videos: newVideos,
  };
};

export type VideosState = {
  videos: { [videoId: string]: Video };
  customVideoIds: string[];
  youtubeVideoIds: string[];
};

const videosInitialState = {
  videos: {},
  customVideoIds: [],
  youtubeVideoIds: [],
};

export const videosReducer = createReducer<VideosState>(
  videosInitialState,
  on(addCustomVideo, addCustomVideoHandler),
  on(loadYoutubeVideosSuccess, loadYoutubeVideosHandler),
  on(deleteCustomVideo, deleteCustomVideoHandler),
  on(clearVideos, clearYoutubeVideosHandler),
  on(addToFavorites, addToFavoritesHandler),
  on(removeFromFavorites, removeFromFavoritesHandler),
);
