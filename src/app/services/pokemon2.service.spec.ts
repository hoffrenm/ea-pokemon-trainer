import { TestBed } from '@angular/core/testing';

import { Pokemon2Service } from './pokemon2.service';

describe('Pokemon2Service', () => {
  let service: Pokemon2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pokemon2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
