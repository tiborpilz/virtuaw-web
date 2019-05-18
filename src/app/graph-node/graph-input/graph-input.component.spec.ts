import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphInputComponent } from './graph-input.component';

describe('GraphInputComponent', () => {
  let component: GraphInputComponent;
  let fixture: ComponentFixture<GraphInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
