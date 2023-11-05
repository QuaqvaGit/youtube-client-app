import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchParams } from 'src/app/shared/models/search-params.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export default class SearchPageComponent {
  searchParams?: SearchParams;

  constructor(route: ActivatedRoute) {
    this.searchParams = route.snapshot.queryParams as SearchParams;
    route.queryParams.subscribe((params) => {
      this.searchParams = params as SearchParams;
    });
  }
}
