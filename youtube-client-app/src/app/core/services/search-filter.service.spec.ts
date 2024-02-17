import { TestBed } from '@angular/core/testing';

import SearchFilterService from './search-filter.service';

describe('SearchFilterService', () => {
  let service: SearchFilterService;

  let value: string;

  const debounceTime = 500;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchFilterService],
    });
    service = TestBed.inject(SearchFilterService);
    service.stream.subscribe((searchValue) => {
      value = searchValue;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should produce values from stream', () => {
    service.attemptSearch('test');
    setTimeout(() => {
      expect(value).toBe('test');
    }, debounceTime);
  });

  it('should debounce search', () => {
    service.attemptSearch('test-2');
    expect(value).toBeFalsy();
    setTimeout(() => {
      expect(value).toBe('test-2');
    });
  });

  it('should filter values by length', () => {
    service.attemptSearch('no');
    setTimeout(() => {
      expect(value).toBe('test');
    }, debounceTime);
  });
});
