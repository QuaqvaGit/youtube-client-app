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

  @Output() sortByInput = new EventEmitter<SortParams>();

  criterias: string[] = Object.values(SortCriterias);

  currentCriteria: string = SortCriterias.Date;

  order: SortOrder = 'ASC';

  constructor(route: ActivatedRoute) {
    route.queryParams.subscribe((params) => {
      this.currentCriteria = params['criteria'] || this.currentCriteria;
      this.order = params['order'] || this.order;
    });
  }

  onCriteriaChange(newCriteria: string): void {
    this.currentCriteria = newCriteria;
    this.sortByInput.emit({
      criteria: this.currentCriteria,
      order: this.order,
    });
  }

  onOrderChange(): void {
    this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
    this.sortByInput.emit({
      criteria: this.currentCriteria,
      order: this.order,
    });
  }
}
