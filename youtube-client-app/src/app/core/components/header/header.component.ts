import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import LoginService from 'src/app/auth/services/login.service';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import {
  SortCriterias,
  SortParams,
} from '../../../shared/models/sort-criterias.model';
import SearchFilterService from '../../services/search-filter.service';

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
    private route: ActivatedRoute,
    public loginService: LoginService,
    searchFilterService: SearchFilterService,
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

    searchFilterService.stream.subscribe((searchValue) => {
      this.searchParams.searchValue = searchValue;
      this.onSearch();
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

  onLogoClick(): void {
    this.router.navigateByUrl('');
  }

  onSearch(): void {
    const commands: string[] = ['videos'];
    const isFavorite = this.router.url.includes('/favorite');
    if (isFavorite) {
      this.searchParams.searchValue = '';
      commands.push('favorite');
    }
    this.router.navigate(commands, {
      relativeTo: this.route,
      queryParams: this.searchParams,
      state: {},
    });
  }

  onLogout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }
}
