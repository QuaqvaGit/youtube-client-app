import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { SortCriterias } from 'src/app/shared/models/sort-criterias.model';
import YoutubeService from './youtube.service';

describe('YoutubeService', () => {
  let service: YoutubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(YoutubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetches a single video', () => {
    service.getItemById('VuxRPkdxMHQ').subscribe((video) => {
      expect(video).toBeDefined();
    });
  });

  it('fetches multiple videos', () => {
    service
      .getItems({
        searchValue: 'test',
        order: 'ASC',
        criteria: SortCriterias.Date,
        filterBy: 'efw',
      })
      .subscribe((videos) => {
        expect(videos).toBeDefined();
      });
  });
});
