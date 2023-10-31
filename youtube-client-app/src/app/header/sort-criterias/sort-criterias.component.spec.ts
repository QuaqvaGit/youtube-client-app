import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortCriteriasComponent } from './sort-criterias.component';

describe('SortCriteriasComponent', () => {
  let component: SortCriteriasComponent;
  let fixture: ComponentFixture<SortCriteriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortCriteriasComponent],
    });
    fixture = TestBed.createComponent(SortCriteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
