import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import RouterLinkWatchService from 'src/app/core/services/router-link-watch.service';

import { AppState } from 'src/app/redux/state.model';
import { Store } from '@ngrx/store';
import selectVideoById from 'src/app/redux/selectors/video-by-id.selector';
import { Observable } from 'rxjs';
import { Video } from '../../models/video.model';

@Component({
  selector: 'app-detailed-info-page',
  templateUrl: './detailed-info-page.component.html',
  styleUrls: ['./detailed-info-page.component.scss'],
})
export default class DetailedInfoPageComponent {
  item$: Observable<Video>;

  prevLinkParams: Params;

  constructor(
    route: ActivatedRoute,
    public linkWatchService: RouterLinkWatchService,
    store: Store<AppState>,
  ) {
    this.prevLinkParams = Object.fromEntries(
      new URLSearchParams(linkWatchService.prevUrl.split('?')[1]).entries(),
    );
    this.item$ = store.select(selectVideoById(route.snapshot.params['id']));
  }
}
