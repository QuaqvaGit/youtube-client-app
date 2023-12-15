import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import selectFavoriteVideos from 'src/app/redux/selectors/favorite-videos.selector';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/redux/state.model';
import { ActivatedRoute } from '@angular/router';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import selectFavoritesPageCount from 'src/app/redux/selectors/favorite-videos-page-count.selector';
import { Video } from '../../models/video.model';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.scss',
})
export default class FavoritePageComponent {
  public items$: Observable<Video[]> = this.store.select(selectFavoriteVideos);

  public pageCount$: Observable<number> = this.store.select(
    selectFavoritesPageCount,
  );

  public searchParams: SearchParams;

  public pageNumber: number = 1;

  public constructor(
    private store: Store<AppState>,
    route: ActivatedRoute,
  ) {
    this.searchParams = route.snapshot.queryParams as SearchParams;
    route.queryParams.subscribe((params) => {
      this.searchParams = params as SearchParams;
    });
  }

  onPageChange(page: number) {
    this.pageNumber = page;
  }
}
