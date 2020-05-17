import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTournamentByKeyComponent } from './get-tournament-by-key.component';

describe('GetTournamentByKeyComponent', () => {
  let component: GetTournamentByKeyComponent;
  let fixture: ComponentFixture<GetTournamentByKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTournamentByKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTournamentByKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
