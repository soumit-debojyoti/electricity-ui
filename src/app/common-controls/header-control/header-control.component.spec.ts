import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderControlComponent } from './header-control.component';

describe('HeaderControlComponent', () => {
  let component: HeaderControlComponent;
  let fixture: ComponentFixture<HeaderControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
