import { ComponentFixture, TestBed } from '@angular/core/testing';

import ButtonComponent from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.parameters = {
      defaultColors: {
        backgroundColor: 'somecolor',
        fontColor: 'somecolor',
      },
      hoverColors: {},
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
