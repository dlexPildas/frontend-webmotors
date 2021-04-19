import { TestBed } from '@angular/core/testing';

import { WebmotorsService } from './webmotors.service';

describe('WebmotorsService', () => {
  let service: WebmotorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebmotorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
