/* eslint-disable class-methods-use-this */
import { Pipe, PipeTransform } from '@angular/core';
import { SortCriterias } from 'src/app/shared/models/sort-criterias.model';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import { Video } from '../models/video.model';

@Pipe({
  name: 'applySearchParams',
})
export default class ApplySearchParamsPipe implements PipeTransform {
  transform(items: Video[] | null, arg: SearchParams): Video[] | null {
    if (!items) return null;
    if (!Object.keys(arg).length) return items;

    const filtered = items.filter((item) =>
      this.filterCallback(item, arg.filterBy.toLowerCase()),
    );
    return this.sort(arg, filtered);
  }

  private sort(params: SearchParams, items: Video[]): Video[] {
    let criteria = params.criteria as string;
    switch (criteria) {
      case SortCriterias.Date:
        criteria = 'publishDate';
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

  private filterCallback: (item: Video, searchValue: string) => boolean = (
    item,
    searchValue,
  ) =>
    item.title.toLowerCase().includes(searchValue) ||
    (item.tags &&
      item.tags.map((tag) => tag.toLowerCase()).includes(searchValue)) ||
    item.description?.toLowerCase().includes(searchValue) ||
    false;
}
