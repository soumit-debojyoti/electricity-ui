import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletApprovalComponent } from './wallet-approval.component';

describe('WalletApprovalComponent', () => {
  let component: WalletApprovalComponent;
  let fixture: ComponentFixture<WalletApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
