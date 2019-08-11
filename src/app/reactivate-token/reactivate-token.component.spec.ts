import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivateTokenComponent } from './reactivate-token.component';

describe('ReactivateTokenComponent', () => {
  let component: ReactivateTokenComponent;
  let fixture: ComponentFixture<ReactivateTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactivateTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivateTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
