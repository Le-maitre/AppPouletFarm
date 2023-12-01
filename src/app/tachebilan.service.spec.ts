import { TestBed } from '@angular/core/testing';

import { TachebilanService } from './tachebilan.service';

describe('TachebilanService', () => {
  let service: TachebilanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TachebilanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
