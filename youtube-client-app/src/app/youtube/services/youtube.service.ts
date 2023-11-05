import { Injectable } from '@angular/core';
import { SortCriterias } from 'src/app/shared/models/sort-criterias.model';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import { SearchResponse } from '../models/search-response.model';
import mockResponse from './mock-response.json';
import { SearchItem } from '../models/search-item.model';

@Injectable({
  providedIn: 'root'
})
export default class YoutubeService {
  public getItems(params: SearchParams): SearchResponse {
    const response = structuredClone(mockResponse);
    response.items = this.applySearchParams(response.items, params);
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  private applySearchParams(items: SearchItem[], params: SearchParams): SearchItem[] {
    let { criteria } = params;
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
