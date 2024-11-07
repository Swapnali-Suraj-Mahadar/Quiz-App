import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyQuizzesService } from '../../services/my-quizzes.service';
import { QuizService } from 'src/app/services/quiz.service';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.css']
})
export class MyQuizzesComponent {
  showModal = false;
  questionFromService: any;
  selectedAnswers: string[] = [];
  correctAnswers: string[] = [];
  score: number = 0;
  localStorageData: any;
  currentQuestionNo: number = 0;
  selectedSubCategory: any;
  selectedDifficultyLevel: any;
  htmlQuestionAnswers: any;
  htmlSelectedQuestionCorrectAnswers: any;
  questionDependsOnSelection: any;
  answers: any;
  results: any;
  allGivenQuizResult: any;

  constructor(private router: Router, private http: HttpClient, private quizService: QuizService, private myQuizzesService: MyQuizzesService, private categoryService: CategoriesService) {
    const navigation = this.router.getCurrentNavigation();
    this.selectedAnswers = navigation?.extras.state?.['selectedAnswers'] || [];
    this.fetchSelectedLevels();
    this.loadHTMLQuestionSelectedAnswers();
    this.myQuizzesService.loadQuestionsForReviewPurpose();

  }

  ngOnInit() {
    // Show the modal after the component loads
    this.showModal = true;

  }

  closeModal() {
    this.showModal = false;
  }

  fetchSelectedLevels(): void {

    this.categoryService.currentSelectedSubCategory.subscribe((selectedCategory: any) => {

      this.selectedSubCategory = selectedCategory
      //  console.log('selectedCategory', this.selectedSubCategory);
    })

    this.categoryService.currentSelectedDifficultyLevel.subscribe((selectedLevel: any) => {
      this.selectedDifficultyLevel = selectedLevel;
      //console.log('selectedLevel', this.selectedDifficultyLevel);
    })

  }

  loadHTMLQuestionSelectedAnswers() {
    this.quizService.loadHTMLAnswers().subscribe((response: any) => {
      this.answers = response;
      // console.log('Answers list', this.answers);

      if (this.selectedSubCategory && this.selectedDifficultyLevel) {
        this.htmlQuestionAnswers = this.answers[this.selectedSubCategory][this.selectedDifficultyLevel];

        this.htmlSelectedQuestionCorrectAnswers = this.htmlQuestionAnswers.map((item: any) => item.correct)
      }

      this.calculateScore();
    })

  }

  calculateScore(): void {
    // console.log('selected subCategory', this.selectedSubCategory);
    // console.log('selected Level', this.selectedDifficultyLevel);
    this.score = this.selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === this.htmlSelectedQuestionCorrectAnswers[index] ? 1 : 0);
    }, 0);

    this.questionFromService = this.myQuizzesService.html_easy_Questions;

    if (this.selectedSubCategory && this.selectedDifficultyLevel) {
      this.questionDependsOnSelection = this.questionFromService[this.selectedSubCategory][this.selectedDifficultyLevel];

    }

    const result = {
      category: this.selectedSubCategory,
      difficulty: this.selectedDifficultyLevel,
      question: this.questionDependsOnSelection,
      selectedAnswers: this.selectedAnswers,
      correctAnswers: this.htmlSelectedQuestionCorrectAnswers,
      score: this.score,
    };
    this.myQuizzesService.saveResult(result);

    // console.log('questions from calculate', this.questionDependsOnSelection);
    localStorage.setItem('myData', JSON.stringify(this.questionDependsOnSelection));

    this.results = this.myQuizzesService.loadResults();
    console.log('result', this.results);


  }






  getlocalStorageData() {


this.results = this.myQuizzesService.loadResults();
    const storedData = localStorage.getItem('myData');

    // console.log('stored Data', storedData);

    if (storedData) {
      console.log('Results', this.results);
      this.results.forEach((res: any) => {
        let data = res.question;
        this.allGivenQuizResult = data;
     
        // console.log('All Question after push', this.allGivenQuizResult);
   })
  //  this.allGivenQuizResult = this.results[index];

      this.localStorageData = JSON.parse(storedData);
      // console.log('localstoragedata', this.localStorageData);


      if (this.currentQuestionNo < this.results.length) {
        this.currentQuestionNo++;
      }


      //  console.log('myDataArray', this.localStorageData);
    }
  }


}

