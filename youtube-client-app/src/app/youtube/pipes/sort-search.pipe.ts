import { Pipe, PipeTransform } from '@angular/core';
import { SortCriterias } from 'src/app/shared/models/sort-criterias.model';
import { SearchParams } from 'src/app/shared/models/search-params.model';
import { SearchItem } from '../models/search-item.model';

@Pipe({
  name: 'sortSearch',
})
export default class SortSearchPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(value: SearchItem[], arg: SearchParams): SearchItem[] {
    let { criteria } = arg;
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
      if (arg.criteria === SortCriterias.Date)
        return new Date(result.toString()).getTime();
      return Number(result);
    };
    value.sort((item1, item2) => {
      const item1Iterable = item1 as unknown as IterableObj;
      const item2Iterable = item2 as unknown as IterableObj;
      const result =
        (arg.order === 'ASC' ? 1 : -1) *
        (propertiesApplier(item1Iterable, criteria) -
          propertiesApplier(item2Iterable, criteria));
      return result;
    });
    return value;
  }
}
