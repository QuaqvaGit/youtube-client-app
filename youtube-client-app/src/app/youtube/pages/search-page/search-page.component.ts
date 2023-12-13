import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';

import selectAllVideos from 'src/app/redux/selectors/full-videos.selector';
import clearVideos from 'src/app/redux/actions/clear-youtube-videos.action';
import { loadYoutubeVideos } from 'src/app/redux/actions/load-youtube-videos.action';
import { AppState } from 'src/app/redux/state.model';

import { SortCriterias } from 'src/app/shared/models/sort-criterias.model';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import { Video } from '../../models/video.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export default class SearchPageComponent {
  items$: Observable<Video[]>;

  searchParams?: SearchParams;

  // eslint-disable-next-line @ngrx/no-typed-global-store
  constructor(route: ActivatedRoute, store: Store<AppState>) {
    this.searchParams = route.snapshot.queryParams as SearchParams;
    this.items$ = store
      .select(selectAllVideos)
      .pipe(
        map((videos) => this.applySearchParams(this.searchParams!, videos)),
      );
    route.queryParams.subscribe((params) => {
      // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
      store.dispatch(clearVideos());
      if (!Object.keys(params).length) return;
      this.searchParams = params as SearchParams;
      // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
      store.dispatch(loadYoutubeVideos({ searchParams: this.searchParams }));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private applySearchParams(params: SearchParams, items: Video[]): Video[] {
    let criteria = params.criteria as string;
    switch (criteria) {
      case SortCriterias.Date:
        criteria = 'publishDate';
        break;
      case SortCriterias.ViewsCount:
        criteria = 'statistics.viewCount';
        break;
      default:
        break;
    }

    type IterableObj = { [key: string]: IterableObj };

    const propertiesApplier = (obj: IterableObj, props: string) => {
      let result = obj;
      props.split('.').forEach((prop) => {
        result = result[prop];
      });
      if (params.criteria === SortCriterias.Date)
        return new Date(result.toString()).getTime();
      return Number(result);
    };
    items.sort((item1, item2) => {
      const item1Iterable = item1 as unknown as IterableObj;
      const item2Iterable = item2 as unknown as IterableObj;
      const result =
        (params.order === 'ASC' ? 1 : -1) *
        (propertiesApplier(item1Iterable, criteria) -
          propertiesApplier(item2Iterable, criteria));
      return result;
    });
    return items;
  }
}
