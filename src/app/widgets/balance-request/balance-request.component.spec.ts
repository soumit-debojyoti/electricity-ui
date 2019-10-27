import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceRequestComponent } from './balance-request.component';

describe('BalanceRequestComponent', () => {
  let component: BalanceRequestComponent;
  let fixture: ComponentFixture<BalanceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
