import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import LoginService from 'src/app/auth/services/login.service';
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

  criteriasShown = false;

  sortCriteria: string = SortCriterias.Date;

  sortOrder: SortOrder = 'ASC';

  searchValue = '';

  constructor(private router: Router, route: ActivatedRoute, public loginService: LoginService) {
    route.queryParams.subscribe((queryParams) => {
      this.sortCriteria = queryParams['criteria'] || this.sortCriteria;
      this.sortOrder = queryParams['order'] || this.sortOrder;
      this.searchValue = queryParams['searchValue'] || this.searchValue;
    });
  }

  onSettingsClick(): void {
    this.criteriasShown = !this.criteriasShown;
  }

  onSortParamsChange(params: SortParams): void {
    this.sortCriteria = params.criteria;
    this.sortOrder = params.order;
    this.onSearch();
  }

  onSearch(): void {
    this.router.navigateByUrl(
      `?searchValue=${this.searchValue}&criteria=${this.sortCriteria}&order=${this.sortOrder}`,
    );
  }

  onLogout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }
}
