import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWalletBalanceAdminComponent } from './add-wallet-balance-admin.component';

describe('AddWalletBalanceAdminComponent', () => {
  let component: AddWalletBalanceAdminComponent;
  let fixture: ComponentFixture<AddWalletBalanceAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWalletBalanceAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWalletBalanceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
