import { TestBed } from '@angular/core/testing';

import { AccuweatherApiService } from './accuweather-api.service';

describe('AccuweatherApiService', () => {
  let service: AccuweatherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccuweatherApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
