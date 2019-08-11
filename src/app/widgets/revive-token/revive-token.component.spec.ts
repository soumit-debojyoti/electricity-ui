import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviveTokenComponent } from './revive-token.component';

describe('ReviveTokenComponent', () => {
  let component: ReviveTokenComponent;
  let fixture: ComponentFixture<ReviveTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviveTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviveTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
