import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, flatMap, forkJoin, map } from 'rxjs';

import { SortCriterias } from 'src/app/shared/models/sort-criterias.model';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import { SearchResponse } from '../models/search-response.model';
import { SearchItem } from '../models/search-item.model';

@Injectable({
  providedIn: 'root',
})
export default class YoutubeService {
  public constructor(private httpClient: HttpClient) {}

  // eslint-disable-next-line class-methods-use-this
  public getItemById(id: string): Observable<SearchItem> {
    return this.httpClient
      .get<SearchResponse>(`videos`, {
        params: { id },
      })
      .pipe(map((response) => response.items[0]));
  }

  public getItems(params: SearchParams): Observable<SearchItem[]> {
    return this.httpClient
      .get<SearchResponse>(`search`, {
        params: { 
          q: params.searchValue, 
          maxResults: 16, 
          type: 'video',
         },
      })
      .pipe(
        map((response) => response.items.map((item) => item.id)),
        flatMap((ids) =>
          forkJoin(ids.map((id) => this.getItemById(id.videoId))),
        ),
        map((items) => this.applySearchParams(params, items))
      );
  }

  // eslint-disable-next-line class-methods-use-this
  private applySearchParams(
    params: SearchParams,
    items: SearchItem[],
  ): SearchItem[] {
    let criteria = params.criteria as string;
    switch (criteria) {
      case SortCriterias.Date:
        criteria = 'snippet.publishedAt';
        break;
      case SortCriterias.ViewsCount:
        criteria = 'statistics.viewCount';
        break;
      default:
        break;
    }

    type IterableObj = { [key: string]: IterableObj };

    const propertiesApplier = (obj: IterableObj, props: string) => {
      let result = obj;
      props.split('.').forEach((prop) => {
        result = result[prop];
      });
      if (params.criteria === SortCriterias.Date)
        return new Date(result.toString()).getTime();
      return Number(result);
    };
    items.sort((item1, item2) => {
      const item1Iterable = item1 as unknown as IterableObj;
      const item2Iterable = item2 as unknown as IterableObj;
      const result =
        (params.order === 'ASC' ? 1 : -1) *
        (propertiesApplier(item1Iterable, criteria) -
          propertiesApplier(item2Iterable, criteria));
      return result;
    });
    return items;
  }
}
