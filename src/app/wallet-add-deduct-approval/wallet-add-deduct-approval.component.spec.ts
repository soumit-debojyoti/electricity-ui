import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAddDeductApprovalComponent } from './wallet-add-deduct-approval.component';

describe('WalletApprovalComponent', () => {
  let component: WalletAddDeductApprovalComponent;
  let fixture: ComponentFixture<WalletAddDeductApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WalletAddDeductApprovalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletAddDeductApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
