import { Pipe, PipeTransform } from '@angular/core';
import { SearchItem } from '../search-item.model';

@Pipe({
  name: 'filterSearch',
})
export default class FilterSearchPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  private filterCallback: (item: SearchItem, searchValue: string) => boolean = (
    item,
    searchValue,
  ) =>
    item.snippet.title.toLowerCase().includes(searchValue) ||
    item.snippet.tags.map((tag) => tag.toLowerCase()).includes(searchValue) ||
    item.snippet.description.toLowerCase().includes(searchValue);

  transform(items: SearchItem[], ...args: string[]): SearchItem[] {
    const searchValue = args[0].toLowerCase();
    return items.filter((item) => this.filterCallback(item, searchValue));
  }
}
