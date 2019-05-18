import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphOutputComponent } from './graph-output.component';

describe('GraphOutputComponent', () => {
  let component: GraphOutputComponent;
  let fixture: ComponentFixture<GraphOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
