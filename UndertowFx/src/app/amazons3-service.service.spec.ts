import { TestBed } from '@angular/core/testing';

import { Amazons3ServiceService } from './amazons3-service.service';

describe('Amazons3ServiceService', () => {
  let service: Amazons3ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Amazons3ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
