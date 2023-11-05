import { Component } from '@angular/core';
import { SearchParams } from 'src/app/shared/models/search-params.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export default class SearchPageComponent {
  searchParams?: SearchParams;

  onSearch(params: SearchParams) {
    this.searchParams = params;
  }
}
