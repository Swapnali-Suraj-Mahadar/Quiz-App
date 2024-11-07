import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  questionURL = '../../assets/quiz_questions_data/html_quiz_questions.json';
  
  private subcategory = new BehaviorSubject<string[]>([]);

  private difficultyLevel = new BehaviorSubject<string[]>([]);
 // currentItems = this.itemsSource.asObservable();
  currentSelectedSubCategory = this.subcategory.asObservable();
  currentSelectedDifficultyLevel = this.difficultyLevel.asObservable();
  
  constructor(private httpClient: HttpClient) { }

  
  loadHTMLQuestions(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.questionURL)
  }

//  updateItems(items: string[]) {
//     this.itemsSource.next(items);
//   }

  setSelectedSubCategory(category: any) {
    this.subcategory.next(category);
  }

  setSelectedDifficultyLevel(level:any){
this.difficultyLevel.next(level);
  }

}
