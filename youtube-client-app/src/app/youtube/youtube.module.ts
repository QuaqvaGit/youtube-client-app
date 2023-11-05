import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import SharedModule from '../shared/shared.module';

import DateColorDirective from './directives/date-color.directive';

import SearchItemComponent from './components/search-item/search-item.component';
import SearchResultsComponent from './components/search-results/search-results.component';
import SearchPageComponent from './pages/search-page/search-page.component';
import DetailedInfoPageComponent from './pages/detailed-info-page/detailed-info-page.component';

import FilterSearchPipe from './pipes/filter-search.pipe';
import GetStatIconPipe from './pipes/get-stat-icon.pipe';
import SortSearchPipe from './pipes/sort-search.pipe';
import YoutubeRoutingModule from './youtube-routing.module';


@NgModule({
  declarations: [
    DateColorDirective,
    SearchItemComponent,
    SearchResultsComponent,
    FilterSearchPipe,
    GetStatIconPipe,
    SortSearchPipe,
    SearchPageComponent,
    DetailedInfoPageComponent,
  ],
  imports: [CommonModule, SharedModule, YoutubeRoutingModule],
  exports: [SearchPageComponent, DetailedInfoPageComponent],
})
export default class YoutubeModule {}
