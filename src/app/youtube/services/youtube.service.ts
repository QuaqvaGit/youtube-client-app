import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, flatMap, forkJoin, map } from 'rxjs';

import { SearchParams } from 'src/app/shared/models/search-params.model';
import { SearchResponse } from '../models/search-response.model';
import { SearchItem } from '../models/search-item.model';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root',
})
export default class YoutubeService {
  public constructor(private httpClient: HttpClient) {}

  // eslint-disable-next-line class-methods-use-this
  public getItemById(id: string): Observable<Video> {
    return this.httpClient
      .get<SearchResponse>(`videos`, {
        params: { id },
      })
      .pipe(map((response) => this.searchItemToVideo(response.items[0])));
  }

  public getItems(params: SearchParams): Observable<Video[]> {
    return this.httpClient
      .get<SearchResponse>(`search`, {
        params: {
          q: params.searchValue,
          maxResults: 100,
          type: 'video',
        },
      })
      .pipe(
        map((response) => response.items.map((item) => item.id.videoId)),
        flatMap((ids) => forkJoin(ids.map((id) => this.getItemById(id)))),
      );
  }

  // eslint-disable-next-line class-methods-use-this
  private searchItemToVideo(searchItem: SearchItem): Video {
    return {
      id: searchItem.id.toString(),
      title: searchItem.snippet.title,
      thumbnail: searchItem.snippet.thumbnails.maxres
        ? searchItem.snippet.thumbnails.maxres.url
        : searchItem.snippet.thumbnails.default.url,
      description: searchItem.snippet.description,
      isFavorite: false,
      publishDate: searchItem.snippet.publishedAt,
      statistics: searchItem.statistics,
      tags: searchItem.snippet.tags,
      videoUrl: `https://www.youtube.com/watch?v=${searchItem.id}`,
    };
  }
}
