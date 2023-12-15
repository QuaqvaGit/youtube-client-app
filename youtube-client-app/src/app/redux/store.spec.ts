import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import addCustomVideo from './actions/add-custom-video.action';
import { Video } from '../youtube/models/video.model';
import selectCustomId from './selectors/custom-id.selector';
import selectCustomVideos from './selectors/custom-videos.selector';
import { loadYoutubeVideos } from './actions/load-youtube-videos.action';
import { SortCriterias } from '../shared/models/sort-criterias.model';
import selectYoutubeVideos from './selectors/youtube-videos.selector';
import deleteVideo from './actions/delete-custom-video.action';
import selectFullVideosPageCount from './selectors/full-video-page-count.selector';
import selectVideoById from './selectors/video-by-id.selector';
import addToFavorites from './actions/add-to-favorites.action';
import removeFromFavorites from './actions/remove-from-favorites.action';
import selectFavoritesPageCount from './selectors/favorite-videos-page-count.selector';
import clearVideos from './actions/clear-youtube-videos.action';
import selectFavoriteVideos from './selectors/favorite-videos.selector';

describe('Store', () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    store = TestBed.inject(MockStore);
  });

  const mockCustomVideo1: Video = {
    id: '1',
    title: 'breber',
    thumbnail: '',
    videoUrl: '',
    publishDate: 'gr',
    tags: ['1'],
  };

  const mockCustomVideo2: Video = {
    ...mockCustomVideo1,
    id: '2',
  };

  const mockCustomVideo3: Video = {
    ...mockCustomVideo1,
    id: '3',
  };

  describe('actions', () => {
    it('should add custom video', () => {
      store.dispatch(
        addCustomVideo({
          video: mockCustomVideo1,
        }),
      );

      store.dispatch(
        addCustomVideo({
          video: mockCustomVideo2,
        }),
      );

      store.dispatch(
        addCustomVideo({
          video: mockCustomVideo3,
        }),
      );

      store.select(selectCustomVideos).subscribe((videos: Video[]) => {
        expect(videos.length).toBe(3);
      });
    });

    it('should load youtube videos', () => {
      store.dispatch(
        loadYoutubeVideos({
          searchParams: {
            searchValue: 'something',
            order: 'ASC',
            criteria: SortCriterias.Date,
            filterBy: '',
          },
        }),
      );

      setTimeout(() => {
        store.select(selectYoutubeVideos).subscribe((videos: Video[]) => {
          expect(videos.length).toBeGreaterThan(10);
        });
      });
    });

    it('should delete custom video', () => {
      store.dispatch(deleteVideo({ id: '3' }));
      store.select(selectCustomVideos).subscribe((videos: Video[]) => {
        expect(videos.length).toBe(2);
      });
    });

    it('should add video to favorites', () => {
      store.select(selectYoutubeVideos).subscribe((videos: Video[]) => {
        store.dispatch(addToFavorites({ id: videos[0].id }));
        store.dispatch(addToFavorites({ id: videos[1].id }));

        store.select(selectCustomVideos).subscribe((videos2: Video[]) => {
          expect(videos2[0].isFavorite).toBeTruthy();
          expect(videos2[1].isFavorite).toBeTruthy();
        });
      });
    });

    it('should remove video from favorites', () => {
      store.select(selectYoutubeVideos).subscribe((videos: Video[]) => {
        const video = videos[0];
        store.dispatch(removeFromFavorites({ id: video.id }));

        store.select(selectCustomVideos).subscribe((videos2: Video[]) => {
          expect(videos2[0].isFavorite).toBeFalsy();
        });
      });
    });

    describe('when clearing youtube videos', () => {
      it('should clear youtube videos', () => {
        store.dispatch(clearVideos());
        store.select(selectYoutubeVideos).subscribe((videos: Video[]) => {
          expect(videos.length).toBe(0);
        });
      });
      it('but not favorites', () => {
        store.select(selectFavoriteVideos).subscribe((videos: Video[]) => {
          expect(videos.length).toBeTruthy();
        });
      });
    });
  });

  describe('selectors', () => {
    it('should generate unique custom video id', () => {
      store.select(selectCustomId).subscribe((id) => {
        expect(id).toBe('3');
      });
    });

    it('should select favorite page count', () => {
      store.select(selectFavoritesPageCount).subscribe((count) => {
        expect(count).toBe(1);
      });
    });

    it('should select total page count', () => {
      store.select(selectFullVideosPageCount).subscribe((count) => {
        expect(count).toBe(6);
      });
    });

    it('should select video by id', () => {
      store.select(selectVideoById('1')).subscribe((video) => {
        expect(video).toBeTruthy();
      });
    });
  });
});
