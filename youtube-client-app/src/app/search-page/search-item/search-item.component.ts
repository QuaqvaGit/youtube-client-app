import { Component, Input } from '@angular/core';
import { SearchItem } from '../search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export default class SearchItemComponent {
  @Input() itemData: SearchItem;
}
