import { Component, Input } from '@angular/core';
import { SearchParams } from 'src/app/search-params.model';
import { SortCriterias } from 'src/app/header/sort-criterias/sort-criterias.model';
import { SearchResponse } from '../search-response.model';
import mockResponse from './mock-response.json';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export default class SearchResultsComponent {
  @Input({ required: true }) searchParams!: SearchParams;

  public get resultsData(): SearchResponse {
    const response = mockResponse;
    const searchValue = this.searchParams.searchValue.toLowerCase();
    response.items = response.items.filter(
      (item) =>
        item.snippet.title.toLowerCase().includes(searchValue) ||
        item.snippet.tags
          .map((tag) => tag.toLowerCase())
          .includes(searchValue) ||
        item.snippet.description.toLowerCase().includes(searchValue),
    );

    let { criteria } = this.searchParams;
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
      if (this.searchParams.criteria === SortCriterias.Date)
        return new Date(result.toString()).getTime();
      return Number(result);
    };
    response.items.sort((item1, item2) => {
      const item1Iterable = item1 as unknown as IterableObj;
      const item2Iterable = item2 as unknown as IterableObj;
      const result =
        (this.searchParams.order === 'ASC' ? 1 : -1) *
        (propertiesApplier(item1Iterable, criteria) -
          propertiesApplier(item2Iterable, criteria));
      return result;
    });
    return response;
  }
}
