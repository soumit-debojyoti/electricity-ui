import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAddApprovalComponent } from './wallet-add-approval.component';

describe('WalletAddApprovalComponent', () => {
  let component: WalletAddApprovalComponent;
  let fixture: ComponentFixture<WalletAddApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletAddApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletAddApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
