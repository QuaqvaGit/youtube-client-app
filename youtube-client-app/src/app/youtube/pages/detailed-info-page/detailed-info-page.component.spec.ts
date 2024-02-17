import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import DetailedInfoPageComponent from './detailed-info-page.component';

describe('DetailedInfoPageComponent', () => {
  let component: DetailedInfoPageComponent;
  let fixture: ComponentFixture<DetailedInfoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedInfoPageComponent],
      imports: [RouterTestingModule, StoreModule],
      providers: [provideMockStore()],
    });
    fixture = TestBed.createComponent(DetailedInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
