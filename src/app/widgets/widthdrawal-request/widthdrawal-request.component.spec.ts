import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidthdrawalRequestComponent } from './widthdrawal-request.component';

describe('WidthdrawalRequestComponent', () => {
  let component: WidthdrawalRequestComponent;
  let fixture: ComponentFixture<WidthdrawalRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidthdrawalRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidthdrawalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
