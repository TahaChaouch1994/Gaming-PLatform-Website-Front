import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeybetmodalComponent } from './keybetmodal.component';

describe('KeybetmodalComponent', () => {
  let component: KeybetmodalComponent;
  let fixture: ComponentFixture<KeybetmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeybetmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeybetmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
