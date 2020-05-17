import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtournamentformComponent } from './rtournamentform.component';

describe('RtournamentformComponent', () => {
  let component: RtournamentformComponent;
  let fixture: ComponentFixture<RtournamentformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtournamentformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtournamentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
