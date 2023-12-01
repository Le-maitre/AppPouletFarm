import { TestBed } from '@angular/core/testing';

import { VaccinService } from './vaccin.service';

describe('VaccinService', () => {
  let service: VaccinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
