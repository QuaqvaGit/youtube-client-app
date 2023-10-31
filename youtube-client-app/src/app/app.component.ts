import { Component } from '@angular/core';
import { SearchParams } from './search-params.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent {
  title = 'Youtube Client App';

  searchParams?: SearchParams;

  onSearch(params: SearchParams) {
    this.searchParams = params;
  }
}
