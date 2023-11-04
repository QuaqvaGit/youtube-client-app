import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import {
  SortCriterias,
  SortOrder,
  SortParams,
} from '../../../shared/models/sort-criterias.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent {
  @Input() appTitle = '';

  @Output() search = new EventEmitter<SearchParams>();

  criteriasShown = false;

  sortCriteria: string = SortCriterias.Date;

  sortOrder: SortOrder = 'ASC';

  searchValue = '';

  onSettingsClick(): void {
    this.criteriasShown = !this.criteriasShown;
  }

  onSortParamsChange(params: SortParams): void {
    this.sortCriteria = params.criteria;
    this.sortOrder = params.order;
    this.onSearch();
  }

  onSearch(): void {
    this.search.emit({
      searchValue: this.searchValue,
      criteria: this.sortCriteria,
      order: this.sortOrder,
    });
  }
}
