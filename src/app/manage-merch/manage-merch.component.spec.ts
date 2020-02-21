import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMerchComponent } from './manage-merch.component';

describe('ManageMerchComponent', () => {
  let component: ManageMerchComponent;
  let fixture: ComponentFixture<ManageMerchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMerchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
