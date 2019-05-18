import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphConnectionsComponent } from './graph-connections.component';

describe('GraphConnectionsComponent', () => {
  let component: GraphConnectionsComponent;
  let fixture: ComponentFixture<GraphConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
