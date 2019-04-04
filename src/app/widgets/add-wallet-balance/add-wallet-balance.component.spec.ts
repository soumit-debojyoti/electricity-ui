import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWalletBalanceComponent } from './add-wallet-balance.component';

describe('AddWalletBalanceComponent', () => {
  let component: AddWalletBalanceComponent;
  let fixture: ComponentFixture<AddWalletBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWalletBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWalletBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
