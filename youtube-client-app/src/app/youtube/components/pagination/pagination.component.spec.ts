import { ComponentFixture, TestBed } from '@angular/core/testing';

import PaginationComponent from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  const pagesCount = 5;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    });

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.pagesCount = pagesCount;
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('generates buttons depending on pages count', () => {
    expect(
      fixture.nativeElement.querySelectorAll('.pagination__page').length,
    ).toBe(pagesCount);
  });
});
