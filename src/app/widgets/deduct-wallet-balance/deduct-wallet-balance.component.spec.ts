import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductWalletBalanceComponent } from './deduct-wallet-balance.component';

describe('DeductWalletBalanceComponent', () => {
  let component: DeductWalletBalanceComponent;
  let fixture: ComponentFixture<DeductWalletBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeductWalletBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductWalletBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
