import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenateMembersComponent } from './senate-members.component';

describe('SenateMembersComponent', () => {
  let component: SenateMembersComponent;
  let fixture: ComponentFixture<SenateMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenateMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenateMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
