import { TestBed } from '@angular/core/testing';

import { NgxOnboardingTourService } from './ngx-onboarding-tour.service';

describe('NgxOnboardingTourService', () => {
  let service: NgxOnboardingTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxOnboardingTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
