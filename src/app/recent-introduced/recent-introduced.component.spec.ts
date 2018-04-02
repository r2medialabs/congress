import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentIntroducedComponent } from './recent-introduced.component';

describe('RecentIntroducedComponent', () => {
  let component: RecentIntroducedComponent;
  let fixture: ComponentFixture<RecentIntroducedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentIntroducedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentIntroducedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
