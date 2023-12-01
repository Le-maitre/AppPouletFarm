import { TestBed } from '@angular/core/testing';

import { VitamineService } from './vitamine.service';

describe('VitamineService', () => {
  let service: VitamineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitamineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
