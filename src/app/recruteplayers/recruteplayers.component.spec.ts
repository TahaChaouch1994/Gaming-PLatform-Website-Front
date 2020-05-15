import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruteplayersComponent } from './recruteplayers.component';

describe('RecruteplayersComponent', () => {
  let component: RecruteplayersComponent;
  let fixture: ComponentFixture<RecruteplayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruteplayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruteplayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
