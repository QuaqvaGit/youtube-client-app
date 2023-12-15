import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map, zip } from 'rxjs';
import { Store } from '@ngrx/store';

import selectYoutubeVideos from 'src/app/redux/selectors/youtube-videos.selector';
import clearVideos from 'src/app/redux/actions/clear-youtube-videos.action';
import { loadYoutubeVideos } from 'src/app/redux/actions/load-youtube-videos.action';
import selectFullVideosPageCount from 'src/app/redux/selectors/full-video-page-count.selector';
import selectCustomVideos from 'src/app/redux/selectors/custom-videos.selector';
import { AppState } from 'src/app/redux/state.model';

import { SearchParams } from 'src/app/shared/models/search-params.model';
import { Video } from '../../models/video.model';
import ApplySearchParamsPipe from '../../pipes/apply-search-params.pipe';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export default class SearchPageComponent {
  items$: Observable<Video[]>;

  pageCount$: Observable<number>;

  searchParams?: SearchParams;

  pageNumber: number = 1;

  // eslint-disable-next-line @ngrx/no-typed-global-store
  constructor(route: ActivatedRoute, store: Store<AppState>) {
    this.searchParams = route.snapshot.queryParams as SearchParams;

    const youtubeItems$ = store.select(selectYoutubeVideos).pipe(
      filter(() => Boolean(this.searchParams?.searchValue)),
      map(
        (videos) =>
          new ApplySearchParamsPipe().transform(videos, this.searchParams!)!,
      ),
    );

    const customItems$ = store.select(selectCustomVideos).pipe(
      filter(() => Boolean(this.searchParams?.searchValue)),
      map(
        (videos) =>
          new ApplySearchParamsPipe().transform(videos, this.searchParams!)!,
      ),
    );

    this.items$ = zip(customItems$, youtubeItems$).pipe(
      map(([custom, youtube]) => [...custom, ...youtube]),
    );

    route.queryParams.subscribe((params) => {
      // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
      store.dispatch(clearVideos());
      if (!Object.keys(params).length) return;
      this.searchParams = params as SearchParams;
      // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
      store.dispatch(loadYoutubeVideos({ searchParams: this.searchParams }));
    });

    this.pageCount$ = store.select(selectFullVideosPageCount);
  }

  onPageChange(page: number) {
    this.pageNumber = page;
  }
}
