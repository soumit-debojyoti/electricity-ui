import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiBalanceComponent } from './api-balance.component';

describe('ApiBalanceComponent', () => {
  let component: ApiBalanceComponent;
  let fixture: ComponentFixture<ApiBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
