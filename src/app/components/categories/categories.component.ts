import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';




@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  categoryForm: FormGroup;
  categoriesData: any[] = [];
  newQuetsions: any[] = [];


  selectedCategory: any;
  selectedSubCategory: any;
  selectedDifficultyLevel: any;
  options: any = {
    mainDropdown: ['HTML', 'CSS', 'Javascript'],
    subCategoryDropdown: {
      'HTML': ['Basic HTML Structure', 'Forms and Input Elements', 'Semantic HTML'],
      'CSS': ['CSS Basics', 'Layout Techniques', 'Responsive Design'],
      'Javascript': ['Basics of JavaScript', 'Functions', 'Asynchronous JavaScript'],
    },
    chooseDefficultyLevelDropdown:
      ['Easy', 'Medium', 'Hard']
  };

  secondOptions: string[] = [];
  thirdOptions: string[] = [];

  constructor(private fb: FormBuilder, private categoryService: CategoriesService) {
    this.categoryForm = this.fb.group({
      mainDropdown: ['', [Validators.required]],
      subCategoryDropdown: ['', [Validators.required]],
      chooseDefficultyLevelDropdown: ['', [Validators.required]],
    });
  }



  onClickCategory() {

    this.selectedSubCategory = this.categoryForm.get('subCategoryDropdown')?.value;
    this.selectedDifficultyLevel = this.categoryForm.get('chooseDefficultyLevelDropdown')?.value;
    this.getSelectedData();


  }


  getSelectedData() {

    this.categoryService.setSelectedSubCategory(this.selectedSubCategory);
    this.categoryService.setSelectedDifficultyLevel(this.selectedDifficultyLevel);

  }




  ngOnInit(): void {


    this.categoryForm.get('mainDropdown')?.valueChanges.subscribe(value => {
      this.secondOptions = this.options.subCategoryDropdown[value] || []; // check this
      this.categoryForm.get('subCategoryDropdown')?.setValue(''); // Reset second dropdown
      this.thirdOptions = []; // Reset third dropdown

    });

    this.categoryForm.get('subCategoryDropdown')?.valueChanges.subscribe(value => {
      this.thirdOptions = this.options.chooseDefficultyLevelDropdown || [];
      this.categoryForm.get('chooseDefficultyLevelDropdown')?.setValue(''); // Reset third dropdown
    });
  }



}
