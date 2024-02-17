import { ComponentFixture, TestBed } from '@angular/core/testing';

import VideoStatisticsComponent from './video-statistics.component';
import GetStatIconPipe from '../../pipes/get-stat-icon.pipe';

describe('VideoStatisticsComponent', () => {
  let component: VideoStatisticsComponent;
  let fixture: ComponentFixture<VideoStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoStatisticsComponent, GetStatIconPipe],
    });
    fixture = TestBed.createComponent(VideoStatisticsComponent);
    component = fixture.componentInstance;
    component.statistics = {
      viewCount: '100',
      likeCount: '50',
      dislikeCount: '10',
      favoriteCount: '5',
      commentCount: '5',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render views', () => {
    expect(
      fixture.nativeElement.querySelector('.fa-eye + .video-statistics__value')
        .textContent,
    ).toBe(component.statistics?.viewCount);
  });

  it('should render likes', () => {
    expect(
      fixture.nativeElement.querySelector(
        '.fa-thumbs-up + .video-statistics__value',
      ).textContent,
    ).toBe(component.statistics?.likeCount);
  });

  it('should render dislikes', () => {
    expect(
      fixture.nativeElement.querySelector(
        '.fa-thumbs-down + .video-statistics__value',
      ).textContent,
    ).toBe(component.statistics?.dislikeCount);
  });
});
