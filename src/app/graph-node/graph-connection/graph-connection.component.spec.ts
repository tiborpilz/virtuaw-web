import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphConnectionComponent } from './graph-connection.component';

describe('GraphConnectionComponent', () => {
  let component: GraphConnectionComponent;
  let fixture: ComponentFixture<GraphConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
