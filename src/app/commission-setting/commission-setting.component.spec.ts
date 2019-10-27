import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionSettingComponent } from './commission-setting.component';

describe('CommissionSettingComponent', () => {
  let component: CommissionSettingComponent;
  let fixture: ComponentFixture<CommissionSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
