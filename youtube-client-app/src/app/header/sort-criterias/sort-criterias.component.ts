import { Component } from '@angular/core';
import SortCriterias from './sort-criterias.model';

@Component({
  selector: 'app-sort-criterias',
  templateUrl: './sort-criterias.component.html',
  styleUrls: ['./sort-criterias.component.scss']
})
export default class SortCriteriasComponent {
  criterias: string[] = Object.values(SortCriterias);

  currentCriteria = SortCriterias.Date;
}
