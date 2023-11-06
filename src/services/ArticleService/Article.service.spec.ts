/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArticleService } from './Article.service';

describe('Service: ArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleService]
    });
  });

  it('should ...', inject([ArticleService], (service: ArticleService) => {
    expect(service).toBeTruthy();
  }));
});
