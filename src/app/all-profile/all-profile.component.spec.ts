import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProfileComponent } from './all-profile.component';

describe('AllProfileComponent', () => {
  let component: AllProfileComponent;
  let fixture: ComponentFixture<AllProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
