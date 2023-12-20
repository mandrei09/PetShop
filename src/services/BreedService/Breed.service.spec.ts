/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BreedService } from './Breed.service';

describe('Service: Breed', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreedService]
    });
  });

  it('should ...', inject([BreedService], (service: BreedService) => {
    expect(service).toBeTruthy();
  }));
});
