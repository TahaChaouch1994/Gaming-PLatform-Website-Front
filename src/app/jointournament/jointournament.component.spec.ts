import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JointournamentComponent } from './jointournament.component';

describe('JointournamentComponent', () => {
  let component: JointournamentComponent;
  let fixture: ComponentFixture<JointournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JointournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JointournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
