import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBalanceReportComponent } from './wallet-balance-report.component';

describe('WalletBalanceReportComponent', () => {
  let component: WalletBalanceReportComponent;
  let fixture: ComponentFixture<WalletBalanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletBalanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletBalanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
