import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  questionURL = "../../../assets/quiz_questions_data/html_quiz_questions.json";
  htmlAnswersURL = "../../../assets/quiz_questions_data/html_quiz_answers.json";
  private selectedQuestionWithCategoryAndLevel = new BehaviorSubject<string[]>([]);
  currentSelectedDifficultyLevel = this.selectedQuestionWithCategoryAndLevel.asObservable();

  constructor(private httpClient: HttpClient) { }

  ngOnInit() { }

  loadHTMLQuestions(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.questionURL)
  }

  loadHTMLAnswers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.htmlAnswersURL)
  }

  setSelectedCategoryAndLevelQuestion(level: any) {
    this.selectedQuestionWithCategoryAndLevel.next(level);
  }
}



