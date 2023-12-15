import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import SearchItemComponent from './search-item.component';

describe('SearchItemComponent', () => {
  let component: SearchItemComponent;
  let fixture: ComponentFixture<SearchItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchItemComponent],
      providers: [provideMockStore()],
    });
    fixture = TestBed.createComponent(SearchItemComponent);
    component = fixture.componentInstance;
    component.video = {
      id: '15',
      title: 'Test',
      thumbnail: 'idk',
      videoUrl: 'doesnt matter',
      publishDate: '1993-12-05',
      tags: ['1'],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
