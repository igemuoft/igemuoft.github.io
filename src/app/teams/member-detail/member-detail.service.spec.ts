import { TestBed } from '@angular/core/testing';

import { MemberDetailService } from './member-detail.service';

describe('MemberDetailService', () => {
  let service: MemberDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
