import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckmytournamentComponent } from './checkmytournament.component';

describe('CheckmytournamentComponent', () => {
  let component: CheckmytournamentComponent;
  let fixture: ComponentFixture<CheckmytournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckmytournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckmytournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
