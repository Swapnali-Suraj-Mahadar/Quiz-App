import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
import { QuizService } from '../../services/quiz.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

class MockQuizService {
  loadHTMLAnswers() {
    return of({}); // Mock implementation
  }
}

class MockCategoriesService {
  currentSelectedSubCategory = of('Easy');
  currentSelectedDifficultyLevel = of('Medium');
  loadHTMLQuestions() {
    return of({
      // easy: {
      //   Medium: [{ question: 'What is 2 + 2?', options: [{ text: '4', isCorrect: true }] }]
      // }
    });
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizComponent],
      providers: [
        { provide: QuizService, useClass: MockQuizService },
        { provide: CategoriesService, useClass: MockCategoriesService },
        { provide: Router, useClass: MockRouter },
        QuizComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    component.selectedAnswers = [];
    component.correct_Answer_Count = 0;
    component.currentQuestionNo = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select an answer correctly', () => {
    component.selectAnswer('A');
    expect(component.selectedAnswers[0]).toBe('A');
  });

  it('should increment correct answer count when selecting a correct option', () => {
    const option = { isCorrect: true, isSelected: false };
    component.selectOption(option);
    expect(component.correct_Answer_Count).toBe(1);
    expect(option.isSelected).toBeTrue();
  });

  it('should return false if no options are selected', () => {
    const options = [{ isSelected: false }, { isSelected: false }];
    const result = component.isOptionSelected(options);
    expect(result).toBeFalse();
  });
  it('should return true if at least one option is selected', () => {
    const options = [{ isSelected: false }, { isSelected: true }];
    const result = component.isOptionSelected(options);
    expect(result).toBeTrue();
  });

  it('should start the quiz and timer', () => {
    component.startQuiz();
    expect(component.showWarning).toBeFalse();
    expect(component.isQuizStarted).toBeTrue();
  });

  it('should select an answer', () => {
    component.selectAnswer('4');
    expect(component.selectedAnswers[0]).toBe('4');
  });

  it('should navigate to the next question', () => {
    component.htmlQuestionsFromCategoryComp = [{}, {}]; // Mock two questions
    component.currentQuestionNo = 0;
    component.nextQuestion();
    expect(component.currentQuestionNo).toBe(1);
  });

  it('should navigate to the previous question', () => {
    component.htmlQuestionsFromCategoryComp = [{}, {}]; // Mock two questions
    component.currentQuestionNo = 1;
    component.prevQuestion();
    expect(component.currentQuestionNo).toBe(0);
  });

  // it('should finish the quiz and navigate', () => {
  //   component.finish();
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/my-quizzes'], jasmine.any(Object));
  // });

  // it('should start the timer', (done) => {
  //   component.startTimer(1);
  //   setTimeout(() => {
  //     expect(component.minutes).toBe(0);
  //     expect(component.seconds).toBeLessThan(60); // Ensure time has passed
  //     done();
  //   }, 1100); // Wait a bit longer than a second
  // });

  afterEach(() => {
    // Clean up after tests
    clearInterval(component.timerInterval);
  });
});
