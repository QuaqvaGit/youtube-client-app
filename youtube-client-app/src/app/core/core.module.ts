import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import SharedModule from '../shared/shared.module';

import HeaderComponent from './components/header/header.component';
import SearchInputComponent from './components/header/search-input/search-input.component';
import SortCriteriasComponent from './components/header/sort-criterias/sort-criterias.component';
import NotFoundPageComponent from './pages/not-found-page/not-found-page.component';

import YoutubeAuthInterceptor from '../youtube/interceptors/youtube-auth.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    SortCriteriasComponent,
    NotFoundPageComponent,
    SearchInputComponent,
  ],
  imports: [CommonModule, HttpClientModule, SharedModule, FormsModule],
  exports: [HeaderComponent, NotFoundPageComponent],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: YoutubeAuthInterceptor,
      multi: true,
    },
  ],
})
export default class CoreModule {}
