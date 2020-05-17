import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddedComponent } from './account-added.component';

describe('AccountAddedComponent', () => {
  let component: AccountAddedComponent;
  let fixture: ComponentFixture<AccountAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
