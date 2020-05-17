import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetHomeComponent } from './bet-home.component';

describe('BetHomeComponent', () => {
  let component: BetHomeComponent;
  let fixture: ComponentFixture<BetHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
