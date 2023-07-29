import { TestBed } from '@angular/core/testing';

import { MysqlServiceService } from './mysql-service.service';

describe('MysqlServiceService', () => {
  let service: MysqlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MysqlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
