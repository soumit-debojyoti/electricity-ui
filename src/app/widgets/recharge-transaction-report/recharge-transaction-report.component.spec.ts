import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeTransactionReportComponent } from './recharge-transaction-report.component';

describe('RechargeTransactionReportComponent', () => {
  let component: RechargeTransactionReportComponent;
  let fixture: ComponentFixture<RechargeTransactionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeTransactionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeTransactionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
