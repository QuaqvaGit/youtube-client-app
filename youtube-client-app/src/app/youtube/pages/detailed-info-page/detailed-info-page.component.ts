import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import RouterLinkWatchService from 'src/app/core/services/router-link-watch.service';

import YoutubeService from '../../services/youtube.service';
import { SearchItem } from '../../models/search-item.model';

@Component({
  selector: 'app-detailed-info-page',
  templateUrl: './detailed-info-page.component.html',
  styleUrls: ['./detailed-info-page.component.scss'],
})
export default class DetailedInfoPageComponent {
  item?: SearchItem;

  prevLinkParams: Params;

  constructor(
    route: ActivatedRoute,
    service: YoutubeService,
    public linkWatchService: RouterLinkWatchService,
  ) {
    this.prevLinkParams = Object.fromEntries(
      new URLSearchParams(linkWatchService.prevUrl.split('?')[1]).entries(),
    );
    route.params.subscribe((params) => {
      service.getItemById(params['id']).subscribe((item) => {
        this.item = item;
      });
    });
  }
}
