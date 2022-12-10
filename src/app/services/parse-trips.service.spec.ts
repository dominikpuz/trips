import { TestBed } from '@angular/core/testing';

import { ParseTripsService } from './parse-trips.service';

describe('ParseTripsService', () => {
  let service: ParseTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
