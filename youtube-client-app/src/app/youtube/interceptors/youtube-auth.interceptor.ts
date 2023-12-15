/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export default class YoutubeAuthInterceptor implements HttpInterceptor {
  private static AUTH_TOKEN = 'AIzaSyChGKFi6rLGpk5UkIKq5dN00Fa3IW1AUZ8';

  private static BASE_URL = 'https://www.googleapis.com/youtube/v3';

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    let params = request.params.append(
      'key',
      YoutubeAuthInterceptor.AUTH_TOKEN,
    );
    if (request.url === 'videos')
      params = params.append('part', 'snippet,statistics');
    else params.append('part', 'snippet');
    const requestWithToken = request.clone({
      url: `${YoutubeAuthInterceptor.BASE_URL}/${request.url}`,
      params,
    });
    return next.handle(requestWithToken);
  }
}
