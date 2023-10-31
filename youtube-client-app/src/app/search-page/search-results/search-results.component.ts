import { Component, Input } from '@angular/core';
import { SearchResponse } from '../search-response.model';
import mockResponse from './mock-response.json';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export default class SearchResultsComponent {
  @Input() resultsData?: SearchResponse = mockResponse;
}
