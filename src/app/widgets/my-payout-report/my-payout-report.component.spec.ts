import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPayoutReportComponent } from './my-payout-report.component';

describe('MyPayoutReportComponent', () => {
  let component: MyPayoutReportComponent;
  let fixture: ComponentFixture<MyPayoutReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPayoutReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPayoutReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
