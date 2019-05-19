import { TestBed } from '@angular/core/testing';

import { CepQueryService } from './cep-query.service';

describe('CepQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CepQueryService = TestBed.get(CepQueryService);
    expect(service).toBeTruthy();
  });
});
