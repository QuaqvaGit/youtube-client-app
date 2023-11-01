import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import ButtonComponent from 'src/app/shared/components/button/button.component';

import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import HeaderComponent from './header/header.component';
import SearchResultsComponent from './search-page/search-results/search-results.component';
import SearchItemComponent from './search-page/search-item/search-item.component';
import GetStatIconPipe from './search-page/get-stat-icon.pipe';
import SortCriteriasComponent from './header/sort-criterias/sort-criterias.component';
import DateColorDirective from './search-page/search-item/date-color.directive';
import FilterSearchPipe from './search-page/search-results/filter-search.pipe';
import SortSearchPipe from './search-page/search-results/sort-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchItemComponent,
    SearchResultsComponent,
    GetStatIconPipe,
    SortCriteriasComponent,
    DateColorDirective,
    FilterSearchPipe,
    SortSearchPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ButtonComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule {}
