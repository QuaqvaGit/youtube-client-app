import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import deleteVideo from 'src/app/redux/actions/delete-custom-video.action';

import { ToastService } from 'angular-toastify';

import { Video } from '../../models/video.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export default class SearchItemComponent {
  @Input({ required: true }) video!: Video;

  @Input() isCustom = false;

  public constructor(
    private store: Store,
    private toastService: ToastService,
  ) {}

  onDelete(): void {
    this.store.dispatch(deleteVideo({ id: this.video.id }));
    this.toastService.error('Video deleted successfully');
  }
}
