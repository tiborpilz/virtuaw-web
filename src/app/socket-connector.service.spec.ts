import { TestBed } from '@angular/core/testing';

import { SocketConnectorService } from './socket-connector.service';

describe('SocketConnectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketConnectorService = TestBed.get(SocketConnectorService);
    expect(service).toBeTruthy();
  });
});
