import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import CoreModule from './core/core.module';
import videosReducer from './redux/reducers/videos.reducer';
import loadVideosEffect from './redux/effects/load-videos.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot({ videos: videosReducer }, {}),
    EffectsModule.forRoot([{ loadVideosEffect }]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule {}
