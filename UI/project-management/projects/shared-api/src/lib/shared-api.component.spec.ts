import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedApiComponent } from './shared-api.component';

describe('SharedApiComponent', () => {
  let component: SharedApiComponent;
  let fixture: ComponentFixture<SharedApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
