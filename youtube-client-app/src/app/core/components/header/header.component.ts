import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import LoginService from 'src/app/auth/services/login.service';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import {
  SortCriterias,
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

  searchParams: SearchParams;

  constructor(
    private router: Router,
    route: ActivatedRoute,
    public loginService: LoginService,
  ) {
    this.searchParams = {
      searchValue: '',
      order: 'ASC',
      filterBy: '',
      criteria: SortCriterias.Date,
    };

    route.queryParams.subscribe((queryParams) => {
      this.searchParams.criteria =
        queryParams['criteria'] || this.searchParams.criteria;
      this.searchParams.order = queryParams['order'] || this.searchParams.order;
      this.searchParams.searchValue =
        queryParams['searchValue'] || this.searchParams.searchValue;
      this.searchParams.filterBy =
        queryParams['filterBy'] || this.searchParams.filterBy;
    });
  }

  onSettingsClick(): void {
    this.criteriasShown = !this.criteriasShown;
  }

  onSortParamsChange(params: SortParams & { shouldSearch: boolean }): void {
    this.searchParams = {
      searchValue: this.searchParams.searchValue,
      ...params,
    };
    if (params.shouldSearch) this.onSearch();
  }

  onSearch(): void {
    const url = Object.entries(this.searchParams)
      .filter((entry) => entry[0] !== 'shouldSearch')
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .join('&');
    this.router.navigateByUrl(`?${url}`, {
      state: {},
    });
  }

  onLogout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }
}
