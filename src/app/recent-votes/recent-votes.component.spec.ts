import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentVotesComponent } from './recent-votes.component';

describe('RecentVotesComponent', () => {
  let component: RecentVotesComponent;
  let fixture: ComponentFixture<RecentVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
