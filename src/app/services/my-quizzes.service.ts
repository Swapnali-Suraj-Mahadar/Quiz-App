import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuizService } from './quiz.service';

interface QuizResult {
  category: string;
  difficulty: string;
  question:any;
  selectedAnswers: any;
  correctAnswers:any
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class MyQuizzesService {
  constructor(private http: HttpClient, private quizService: QuizService) { }

  html_easy_Questions: any;
  private results: QuizResult[] = [];


  saveResult(result: QuizResult) {
    this.results.push(result);
    localStorage.setItem('quizResults', JSON.stringify(this.results));

  }

  loadResults() {
    const results = localStorage.getItem('quizResults');
    if (results) {
      this.results = JSON.parse(results);
   
    }
    return this.results;
  }


  loadQuestionsForReviewPurpose() {
    this.quizService.loadHTMLQuestions().subscribe((questions: any) => {
      this.html_easy_Questions = questions;
    },
      (error) => {
        console.error('Error fetching data', error);
      })
  }


}
