import { Component } from '@angular/core';
import SearchFilterService from 'src/app/core/services/search-filter.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export default class SearchInputComponent {
  public constructor(private filterService: SearchFilterService) {}

  onInput(value: string): void {
    this.filterService.attemptSearch(value);
  }
}
