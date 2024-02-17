import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import AdminPageComponent from './admin-page.component';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageComponent],
      providers: [provideMockStore()],
    });
    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
