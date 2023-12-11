import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import YoutubeService from '../../services/youtube.service';
import { SearchItem } from '../../models/search-item.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export default class SearchPageComponent {
  searchParams?: SearchParams;

  searchResults?: SearchItem[];

  constructor(route: ActivatedRoute, service: YoutubeService) {
    this.searchParams = route.snapshot.queryParams as SearchParams;
    route.queryParams.subscribe((params) => {
      if (!Object.keys(params).length) return;
      this.searchParams = params as SearchParams;
      service.getItems(this.searchParams).subscribe((response) => {
        this.searchResults = response;
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  // private applySearchParams(
  //   params: SearchParams,
  //   items: SearchItem[],
  // ): SearchItem[] {
  //   let criteria = params.criteria as string;
  //   switch (criteria) {
  //     case SortCriterias.Date:
  //       criteria = 'snippet.publishedAt';
  //       break;
  //     case SortCriterias.ViewsCount:
  //       criteria = 'statistics.viewCount';
  //       break;
  //     default:
  //       break;
  //   }

  //   type IterableObj = { [key: string]: IterableObj };

  //   const propertiesApplier = (obj: IterableObj, props: string) => {
  //     let result = obj;
  //     props.split('.').forEach((prop) => {
  //       result = result[prop];
  //     });
  //     if (params.criteria === SortCriterias.Date)
  //       return new Date(result.toString()).getTime();
  //     return Number(result);
  //   };
  //   items.sort((item1, item2) => {
  //     const item1Iterable = item1 as unknown as IterableObj;
  //     const item2Iterable = item2 as unknown as IterableObj;
  //     const result =
  //       (params.order === 'ASC' ? 1 : -1) *
  //       (propertiesApplier(item1Iterable, criteria) -
  //         propertiesApplier(item2Iterable, criteria));
  //     return result;
  //   });
  //   return items;
  // }
}
