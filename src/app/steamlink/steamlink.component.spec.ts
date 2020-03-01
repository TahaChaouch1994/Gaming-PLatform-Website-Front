import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamlinkComponent } from './steamlink.component';

describe('SteamlinkComponent', () => {
  let component: SteamlinkComponent;
  let fixture: ComponentFixture<SteamlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteamlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
