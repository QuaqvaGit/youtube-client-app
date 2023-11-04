import { Component, Input } from '@angular/core';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import { SearchResponse } from '../../models/search-response.model';
import mockResponse from './mock-response.json';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export default class SearchResultsComponent {
  @Input({ required: true }) searchParams!: SearchParams;

  searchResults: SearchResponse = mockResponse;
}
