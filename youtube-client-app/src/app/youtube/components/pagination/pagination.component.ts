import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export default class PaginationComponent implements OnChanges {
  @Input({ required: true }) pagesCount!: number;

  @Output() pageNumber = new EventEmitter<number>();

  pages: number[] = [];

  onPageSelect(page: number) {
    this.pageNumber.emit(page);
  }

  ngOnChanges(): void {
    this.pages =
      this.pagesCount > 1
        ? Array(this.pagesCount)
            .fill(0)
            .map((value, index) => index + 1)
        : [];
  }
}
