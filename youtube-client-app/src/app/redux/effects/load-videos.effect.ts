/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
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
      exhaustMap((params: SearchParams) =>
        youtubeService.getItems(params).pipe(
          map((videos) => loadYoutubeVideosSuccess({ videos })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  { functional: true },
);
export default loadVideosEffects;
