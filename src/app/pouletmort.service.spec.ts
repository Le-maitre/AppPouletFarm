import { TestBed } from '@angular/core/testing';

import { PouletmortService } from './pouletmort.service';

describe('PouletmortService', () => {
  let service: PouletmortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PouletmortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
