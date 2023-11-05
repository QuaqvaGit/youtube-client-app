import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import YoutubeService from '../../services/youtube.service';
import { SearchItem } from '../../models/search-item.model';

@Component({
  selector: 'app-detailed-info-page',
  templateUrl: './detailed-info-page.component.html',
  styleUrls: ['./detailed-info-page.component.scss'],
})
export default class DetailedInfoPageComponent {
  item?: SearchItem;

  constructor(route: ActivatedRoute, service: YoutubeService) {
    route.params.subscribe((params) => {
      this.item = service.getItemById(params['id']);
    });
  }
}
