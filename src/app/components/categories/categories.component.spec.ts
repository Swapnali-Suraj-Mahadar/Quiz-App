import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CategoriesComponent } from './categories.component';
import { HttpClientModule } from '@angular/common/http';


describe('CategoryComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      imports: [ReactiveFormsModule,HttpClientModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set selectedSubCategory and selectedDifficultyLevel correctly', () => {
    // Arrange
    component.categoryForm.get('subCategoryDropdown')?.setValue('Test SubCategory');
    component.categoryForm.get('chooseDefficultyLevelDropdown')?.setValue('Medium');

    // Act
    component.onClickCategory();

    // Assert
    expect(component.selectedSubCategory).toBe('Test SubCategory');
    expect(component.selectedDifficultyLevel).toBe('Medium');
  });

  it('should call getSelectedData when onClickCategory is called', () => {
    // Arrange
    spyOn(component, 'getSelectedData');
    component.categoryForm.get('subCategoryDropdown')?.setValue('Test SubCategory');
    component.categoryForm.get('chooseDefficultyLevelDropdown')?.setValue('Medium');

    // Act
    component.onClickCategory();

    // Assert
    expect(component.getSelectedData).toHaveBeenCalled();
  });

  it('should handle null values correctly', () => {
    // Arrange
    component.categoryForm.get('subCategoryDropdown')?.setValue(null);
    component.categoryForm.get('chooseDefficultyLevelDropdown')?.setValue(null);

    // Act
    component.onClickCategory();

    // Assert
    expect(component.selectedSubCategory).toBeNull();
    expect(component.selectedDifficultyLevel).toBeNull();
  });
});
