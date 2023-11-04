import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import HeaderComponent from './components/header/header.component';
import SortCriteriasComponent from './components/header/sort-criterias/sort-criterias.component';
import SharedModule from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, SortCriteriasComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export default class CoreModule { }
