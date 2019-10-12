import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletWithdrawalApprovalComponent } from './wallet-withdrawal-approval.component';

describe('WalletWithdrawalApprovalComponent', () => {
  let component: WalletWithdrawalApprovalComponent;
  let fixture: ComponentFixture<WalletWithdrawalApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletWithdrawalApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletWithdrawalApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
