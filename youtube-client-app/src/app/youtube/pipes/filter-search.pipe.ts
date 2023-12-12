import { Pipe, PipeTransform } from '@angular/core';
import { Video } from '../models/video.model';

@Pipe({
  name: 'filterSearch',
})
export default class FilterSearchPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  private filterCallback: (item: Video, searchValue: string) => boolean = (
    item,
    searchValue,
  ) =>
    item.title.toLowerCase().includes(searchValue) ||
    item.tags.map((tag) => tag.toLowerCase()).includes(searchValue) ||
    item.description?.toLowerCase().includes(searchValue) ||
    false;

  transform(items: Video[] | null, filterValue: string): Video[] | null {
    if (!items) return null;
    if (!filterValue) return items;
    return items.filter((item) =>
      this.filterCallback(item, filterValue.toLowerCase()),
    );
  }
}
