import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import HeaderComponent from './components/header/header.component';
import SortCriteriasComponent from './components/header/sort-criterias/sort-criterias.component';
import SharedModule from '../shared/shared.module';
import NotFoundPageComponent from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SortCriteriasComponent,
    NotFoundPageComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
  exports: [HeaderComponent, NotFoundPageComponent],
})
export default class CoreModule {}
