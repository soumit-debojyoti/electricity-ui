import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTransferComponent } from './balance-transfer.component';

describe('BalanceTransferComponent', () => {
  let component: BalanceTransferComponent;
  let fixture: ComponentFixture<BalanceTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
