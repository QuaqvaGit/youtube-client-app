import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import SortCriteriasComponent from './sort-criterias.component';

describe('SortCriteriasComponent', () => {
  let component: SortCriteriasComponent;
  let fixture: ComponentFixture<SortCriteriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortCriteriasComponent],
      imports: [RouterTestingModule],
      providers: [],
    });
    fixture = TestBed.createComponent(SortCriteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
