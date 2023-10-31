import { Component, EventEmitter, Output } from '@angular/core';
import { SortCriterias, SortOrder, SortParams } from './sort-criterias.model';

@Component({
  selector: 'app-sort-criterias',
  templateUrl: './sort-criterias.component.html',
  styleUrls: ['./sort-criterias.component.scss'],
})
export default class SortCriteriasComponent {
  @Output() sortByInput = new EventEmitter<SortParams>();

  criterias: string[] = Object.values(SortCriterias);

  currentCriteria: string = SortCriterias.Date;

  order: SortOrder = 'ASC';

  onCriteriaChange(newCriteria: string): void {
    this.currentCriteria = newCriteria;
    this.sortByInput.emit({
      criteria: this.currentCriteria,
      order: this.order,
    });
  }

  onOrderChange(): void {
    this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
  }
}
