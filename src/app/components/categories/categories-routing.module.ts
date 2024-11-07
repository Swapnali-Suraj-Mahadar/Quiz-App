import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { QuizComponent } from '../quiz/quiz.component';
import { MyQuizzesComponent } from '../my-quizzes/my-quizzes.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  {path:'quiz', component:QuizComponent},
  {path:'my-quizzes', component:MyQuizzesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
