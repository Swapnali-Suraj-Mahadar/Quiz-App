import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { QuizComponent } from '../quiz/quiz.component';
import { MyQuizzesComponent } from '../my-quizzes/my-quizzes.component';




@NgModule({
  declarations: [
    QuizComponent,
    MyQuizzesComponent
    
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
