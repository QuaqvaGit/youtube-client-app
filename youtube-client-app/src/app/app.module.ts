import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import HeaderComponent from './header/header.component';
import SearchResultsComponent from './search-page/search-results/search-results.component';
import SearchItemComponent from './search-page/search-item/search-item.component';
import GetStatIconPipe from './search-page/get-stat-icon.pipe';
import SortCriteriasComponent from './header/sort-criterias/sort-criterias.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchItemComponent,
    SearchResultsComponent,
    GetStatIconPipe,
    SortCriteriasComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule {}
