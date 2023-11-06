import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SortCriterias,
  SortOrder,
  SortParams,
} from '../../../../shared/models/sort-criterias.model';

@Component({
  selector: 'app-sort-criterias',
  templateUrl: './sort-criterias.component.html',
  styleUrls: ['./sort-criterias.component.scss'],
})
export default class SortCriteriasComponent {
  @Input({ required: true }) isShown = false;

  @Output() sortByInput = new EventEmitter<SortParams & { shouldSearch: boolean }>();

  criterias: string[] = Object.values(SortCriterias);

  currentCriteria = SortCriterias.Date;

  order: SortOrder = 'ASC';

  filterBy = '';

  constructor(route: ActivatedRoute) {
    route.queryParams.subscribe((params) => {
      this.currentCriteria = params['criteria'] || this.currentCriteria;
      this.order = params['order'] || this.order;
      this.filterBy = params['filterBy'] || this.filterBy;
    });
  }

  onCriteriaChange(newCriteria: string): void {
    this.currentCriteria = newCriteria as SortCriterias;
    this.emitParams();
  }

  onOrderChange(): void {
    this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
    this.emitParams();
  }

  emitParams(shouldSearch = true): void {
    this.sortByInput.emit({
      criteria: this.currentCriteria,
      order: this.order,
      filterBy: this.filterBy,
      shouldSearch
    });
  }
}
