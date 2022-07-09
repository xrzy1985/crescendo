import { TestBed } from '@angular/core/testing';

import { HttpRecipesService } from './http-recipes.service';

describe('HttpRecipesService', () => {
  let service: HttpRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
