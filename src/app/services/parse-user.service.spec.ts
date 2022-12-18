import { TestBed } from '@angular/core/testing';

import { ParseUserService } from './parse-user.service';

describe('ParseUserService', () => {
  let service: ParseUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
