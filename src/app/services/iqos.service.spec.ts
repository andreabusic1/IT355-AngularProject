import { TestBed } from '@angular/core/testing';

import { IqosService } from './iqos.service';

describe('IqosService', () => {
  let service: IqosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IqosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
