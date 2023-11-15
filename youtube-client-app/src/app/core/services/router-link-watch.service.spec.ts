import { TestBed } from '@angular/core/testing';

import { RouterLinkWatchService } from './router-link-watch.service';

describe('RouterLinkWatchService', () => {
  let service: RouterLinkWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterLinkWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
