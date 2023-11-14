import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import YoutubeService from '../../services/youtube.service';
import { SearchItem } from '../../models/search-item.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export default class SearchPageComponent {
  searchParams?: SearchParams;

  searchResults?: SearchItem[];

  constructor(route: ActivatedRoute, service: YoutubeService) {
    this.searchParams = route.snapshot.queryParams as SearchParams;
    route.queryParams.subscribe((params) => {
      if (!Object.keys(params).length) return;
      this.searchParams = params as SearchParams;
      service.getItems(this.searchParams).subscribe((response) => {
        this.searchResults = response;
      });
    });
  }
}
