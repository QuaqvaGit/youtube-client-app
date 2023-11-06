import { Component, Input } from '@angular/core';
import { VideoStatistics } from '../../models/search-item.model';

@Component({
  selector: 'app-video-statistics',
  templateUrl: './video-statistics.component.html',
  styleUrls: ['./video-statistics.component.scss']
})
export default class VideoStatisticsComponent {
  @Input({ required: true }) statistics?: VideoStatistics;

  @Input() displayInOneLine = false;
}
