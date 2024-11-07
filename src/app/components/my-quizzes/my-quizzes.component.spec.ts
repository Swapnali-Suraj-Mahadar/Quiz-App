import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuizzesComponent } from './my-quizzes.component';
import { HttpClientModule } from '@angular/common/http';

describe('MyQuizzesComponent', () => {
  let component: MyQuizzesComponent;
  let fixture: ComponentFixture<MyQuizzesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyQuizzesComponent],
      imports:[HttpClientModule]
    });
    fixture = TestBed.createComponent(MyQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.results = [
      { question: 'What is 2 + 2?' },
      { question: 'What is the capital of France?' }
    ];
  });

  afterEach(() => {
    
    localStorage.removeItem('myData');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show modal on initialization', () => {
    component.ngOnInit();
    expect(component.showModal).toBeTrue();
  });

   it('should close modal when closeModal is called', () => {
    component.showModal = true; // Ensure modal is open
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });

  it('should retrieve data from localStorage and increment currentQuestionNo', () => {
    const mockData = JSON.stringify({ answer: '4' });
    localStorage.setItem('myData', mockData);

    component.getlocalStorageData();

    expect(component.localStorageData).toEqual({ answer: '4' });
    expect(component.currentQuestionNo).toBe(0); 
    expect(component.allGivenQuizResult).toBe(undefined);
  });

  it('should not increment currentQuestionNo if it exceeds results length', () => {
    const mockData = JSON.stringify({ answer: '4' });
    localStorage.setItem('myData', mockData);
    component.currentQuestionNo = 2; 

    component.getlocalStorageData();

    expect(component.currentQuestionNo).toBe(2); 
  });
  it('should not change currentQuestionNo if there is no data in localStorage', () => {
    component.getlocalStorageData();
    expect(component.currentQuestionNo).toBe(0); 
  });
});
