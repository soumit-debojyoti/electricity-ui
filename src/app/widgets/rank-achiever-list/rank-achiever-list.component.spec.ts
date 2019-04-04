import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankAchieverListComponent } from './rank-achiever-list.component';

describe('RankAchieverListComponent', () => {
  let component: RankAchieverListComponent;
  let fixture: ComponentFixture<RankAchieverListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankAchieverListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankAchieverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
