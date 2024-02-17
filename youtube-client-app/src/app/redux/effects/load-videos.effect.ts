/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import YoutubeService from 'src/app/youtube/services/youtube.service';
import {
  loadYoutubeVideos,
  loadYoutubeVideosSuccess,
} from '../actions/load-youtube-videos.action';

const loadVideosEffects = createEffect(
  (actions$ = inject(Actions), youtubeService = inject(YoutubeService)) =>
    actions$.pipe(
      ofType(loadYoutubeVideos.type),
      exhaustMap((action: { type: string; searchParams: SearchParams }) =>
        youtubeService.getItems(action.searchParams).pipe(
          map((videos) => loadYoutubeVideosSuccess({ videos })),
          catchError((error) => of(error)),
        ),
      ),
    ),
  { functional: true },
);
export default loadVideosEffects;
