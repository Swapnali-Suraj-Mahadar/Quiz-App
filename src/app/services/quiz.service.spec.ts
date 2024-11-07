import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuizService } from './quiz.service';

describe('QuizService', () => {
  let service: QuizService;
  let httpMock: HttpTestingController;

  const mockQuestions = [
    { question: 'What is HTML?', options: ['HyperText Markup Language', 'HyperText Markdown Language'], answer: 'HyperText Markup Language' }
  ];

  const mockAnswers = [
    { questionId: 1, answer: 'HyperText Markup Language' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizService]
    });

    service = TestBed.inject(QuizService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load HTML questions', () => {
    service.loadHTMLQuestions().subscribe(questions => {
      expect(questions).toEqual(mockQuestions);
    });

    const req = httpMock.expectOne("../../../assets/quiz_questions_data/html_quiz_questions.json");
    expect(req.request.method).toBe("GET");
    req.flush(mockQuestions);
  });

  it('should load HTML answers', () => {
    service.loadHTMLAnswers().subscribe(answers => {
      expect(answers).toEqual(mockAnswers);
    });

    const req = httpMock.expectOne("../../../assets/quiz_questions_data/html_quiz_answers.json");
    expect(req.request.method).toBe("GET");
    req.flush(mockAnswers);
  });

  it('should update the selected category and level question', () => {
    const level = ['HTML', 'Easy'];

    service.setSelectedCategoryAndLevelQuestion(level);

    service.currentSelectedDifficultyLevel.subscribe(selectedLevel => {
      expect(selectedLevel).toEqual(level);
    });
  });
});
