/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableHeaderService } from './TableHeader.service';

describe('Service: TableHeader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableHeaderService]
    });
  });

  it('should ...', inject([TableHeaderService], (service: TableHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
