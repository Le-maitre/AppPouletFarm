import { TestBed } from '@angular/core/testing';

import { UserentriesService } from './userentries.service';

describe('UserentriesService', () => {
  let service: UserentriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserentriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
