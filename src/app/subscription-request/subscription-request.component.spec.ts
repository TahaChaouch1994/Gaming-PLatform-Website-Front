import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionRequestComponent } from './subscription-request.component';

describe('SubscriptionRequestComponent', () => {
  let component: SubscriptionRequestComponent;
  let fixture: ComponentFixture<SubscriptionRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
