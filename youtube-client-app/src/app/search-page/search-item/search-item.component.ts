import { Component, Input } from '@angular/core';
import { SearchItem } from '../search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export default class SearchItemComponent {
  @Input({ required: true }) itemData?: SearchItem;

  getBorderColor(): string {
    if (!this.itemData) throw Error();

    const publishDate = new Date(this.itemData.snippet.publishedAt);
    const daysDiff = Math.floor(
      (Date.now() - publishDate.getTime()) / (1000 * 3600 * 24),
    );

    const now = new Date();
    const monthsDiff =
      now.getMonth() -
      publishDate.getMonth() +
      12 * (now.getFullYear() - publishDate.getFullYear());

    if (monthsDiff >= 6) return 'red';
    if (monthsDiff < 6 && monthsDiff > 1) return 'yellow';
    if (daysDiff >= 7) return 'green';
    return 'blue';
  }
}
