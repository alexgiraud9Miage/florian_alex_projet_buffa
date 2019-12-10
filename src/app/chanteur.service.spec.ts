import { TestBed } from '@angular/core/testing';

import { ChanteurService } from './chanteur.service';

describe('ChanteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChanteurService = TestBed.get(ChanteurService);
    expect(service).toBeTruthy();
  });
});
