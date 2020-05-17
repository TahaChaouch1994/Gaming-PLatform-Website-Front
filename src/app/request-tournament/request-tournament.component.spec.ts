import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTournamentComponent } from './request-tournament.component';

describe('RequestTournamentComponent', () => {
  let component: RequestTournamentComponent;
  let fixture: ComponentFixture<RequestTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
