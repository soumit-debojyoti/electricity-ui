import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdsChargeComponent } from './tds-charge.component';

describe('TdsChargeComponent', () => {
  let component: TdsChargeComponent;
  let fixture: ComponentFixture<TdsChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdsChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdsChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
