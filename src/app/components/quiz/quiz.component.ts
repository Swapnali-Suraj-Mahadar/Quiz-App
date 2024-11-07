import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { QuizService } from '../../services/quiz.service';
import { CategoriesService } from 'src/app/services/categories.service';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  showWarning: boolean = true;
  isQuizStarted: boolean = false;
  isQuizEnded: boolean = false
  answers: any[] = [];
  currentQuestionNo: number = 0;
  html_Questions: any;
  html_Easy_Questions: any[] = [];
  html_Easy_Question_Length: any;
  easy_Oestion_Title: any;
  each_question_title: any;
  remaining_Time: number = 10;
  timer = interval(100000);
  subscription: Subscription[] = [];
  correct_Answer_Count: number = 0;
  selectedAnswers: string[] = [];
  htmlQuestionsFromCategoryComp: any[] = [];
  htmlQuestionAnswers: any[] = [];
  categories = [];
  selectedSubCategory: any;
  selectedDifficultyLevel = '';
  html_Question_Quiz_Data: any;
  currentQuestionIndex = 0;
  score = 0;
  minutes: number = 0;
  seconds: number = 30; // Start with 30 seconds
  timerInterval: any;

  constructor(private router: Router, private quizService: QuizService, private categoryService: CategoriesService) {
    this.loadQuestions();
  }

  ngOnInit() {
    this.loadQuestions();
    this.startTimer(30); 
    this.loadAnswers();
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  startTimer(duration: number) {
    this.minutes = Math.floor(duration / 60);
    this.seconds = duration % 60;
    this.timerInterval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          clearInterval(this.timerInterval);
          this.finish();
          return;
        }
        this.minutes--;
        this.seconds = 59;
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  loadQuestions() {
    this.categoryService.currentSelectedSubCategory.subscribe((subCategory: any) => {
      this.selectedSubCategory = subCategory
      //console.log('selectedSubCategory from category---->', this.selectedSubCategory);
    })
    this.categoryService.currentSelectedDifficultyLevel.subscribe((difficultyLevel: any) => {
      this.selectedDifficultyLevel = difficultyLevel;
      // console.log('selecteddifficultyLevel from category', this.selectedDifficultyLevel);
    })
    this.categoryService.loadHTMLQuestions().subscribe((data: any) => {
      this.html_Question_Quiz_Data = data;
      if (this.selectedSubCategory && this.selectedDifficultyLevel) {
        this.htmlQuestionsFromCategoryComp = this.html_Question_Quiz_Data[this.selectedSubCategory][this.selectedDifficultyLevel];
      }
    })
  }

  loadAnswers() {
    this.quizService.loadHTMLAnswers().subscribe((response: any) => {
      this.answers = response;
      if (this.selectedSubCategory && this.selectedDifficultyLevel) {
        this.htmlQuestionAnswers = this.answers[this.selectedSubCategory][this.selectedDifficultyLevel];
      }
    })
  }

  selectAnswer(answer: string): void {
    this.selectedAnswers[this.currentQuestionNo] = answer;
  }

  nextQuestion(): void {
    if (this.currentQuestionNo < this.htmlQuestionsFromCategoryComp.length - 1) {
      this.currentQuestionNo++;
    }
  }

  prevQuestion() {
    if (this.currentQuestionNo > 0) {
      this.currentQuestionNo--;
    }
  }

  selectOption(option: any) {
    if (option.isCorrect) {
      this.correct_Answer_Count++;
    }
    option.isSelected = true;
  }

  isOptionSelected(options: any) {
    const selection_Answer_Count = options.filter((m: any) => m.isSelected == true).length;
    if (selection_Answer_Count == 0) {
      return false;
    } else {
      return true;
    }
  }

  startQuiz() {
    this.showWarning = false;
    this.isQuizStarted = true;

    this.subscription.push(this.timer.subscribe((res: any) => {

      if (this.remaining_Time != 0) {
        this.remaining_Time--;
      }
      if (this.remaining_Time == 0) {
        this.nextQuestion();
        this.remaining_Time = 10;
      }

    })
    )
  }

  finish() {
    this.router.navigate(['/my-quizzes'], { state: { selectedAnswers: this.selectedAnswers } });
  }

  start() {
    this.showWarning = false;
    this.isQuizEnded = false;
    this.isQuizStarted = false;
  }
}
