import { TestBed } from '@angular/core/testing';

import { MyQuizzesService } from './my-quizzes.service';
import { HttpClientModule } from '@angular/common/http';

describe('MyQuizzesService', () => {
  let service: MyQuizzesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(MyQuizzesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});

