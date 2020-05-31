import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray, FormGroup } from '@angular/forms';
import { RecipeI } from 'src/interfaces/recipe-interface';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.scss']
})
export class RecipeCreatorComponent implements OnInit {
  @Input() recipe: RecipeI;
  ingredientType: string[] = ['cold', 'dry', 'frozen', 'produce'];
  unitType: string[] = ["count", "cup", "gram", "ounce", "quart", "tbsp", "tsp"];

  recipeNameGroup: FormControl;
  recipeIngredientsGroup: FormArray;
  recipePreparationGroup: FormArray;
  recipeCookingGroup: FormArray;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.recipe != null) {
      this.recipeNameGroup = this.fb.control(this.recipe.name, Validators.required);
      this.recipeIngredientsGroup = this.fb.array([]);
      for (let i = 0; i < this.recipe.ingredientList.length; i++) {
        let ingredient = this.recipe.ingredientList[i];
        this.recipeIngredientsGroup.push(
          this.addIngredientFormGroup(ingredient.name, ingredient.amount, ingredient.unit, ingredient.type)
        )
      }
      this.recipePreparationGroup = this.fb.array([]);
      for (let i = 0; i < this.recipe.preparation.length; i++) {
        let prep = this.recipe.preparation[i];
        this.recipePreparationGroup.push(
          this.addPreparationFormControl(prep)
        )
      }
      this.recipeCookingGroup = this.fb.array([]);
      for (let i = 0; i < this.recipe.cooking.length; i++) {
        let cookInst = this.recipe.cooking[i];
        this.recipeCookingGroup.push(
          this.addCookingFormControl(cookInst)
        )
      }
    } else {
      this.recipeNameGroup = this.fb.control('', Validators.required);
      this.recipeIngredientsGroup = this.fb.array([
        this.addIngredientFormGroup()
      ]);
      this.recipePreparationGroup = this.fb.array([
        this.addPreparationFormControl()
      ])
      this.recipeCookingGroup = this.fb.array([
        this.addCookingFormControl()
      ])
    }
  }

  addIngredientFormGroup(name?, amount?, unit?, type?): FormGroup {
    return this.fb.group({
      name: [name ? name : '', Validators.required],
      amount: [amount ? amount : -1, [Validators.required, Validators.min(0)]],
      unit: [unit ? unit : '', Validators.required],
      type: [type ? type : '', Validators.required]
    });
  }

  addPreparationFormControl(prep?): FormControl {
    return this.fb.control(prep ? prep : '', Validators.required);
  }

  addCookingFormControl(cookInst?): FormControl {
    return this.fb.control(cookInst ? cookInst : '', Validators.required);
  }
  addIngredient(): void {
    this.recipeIngredientsGroup.push(this.addIngredientFormGroup());
  }
  removeIngredient(index: number): void {
    if (confirm('Remove?')) {
      this.recipeIngredientsGroup.removeAt(index);
    }
  }
  addPrepration(): void {
    this.recipePreparationGroup.push(this.addPreparationFormControl());
  }
  removePreparation(index: number): void {
    if (confirm('Remove?')) {
      this.recipePreparationGroup.removeAt(index);
    }
  }
  addCookingInstruction(): void {
    this.recipeCookingGroup.push(this.addCookingFormControl());
  }
  removeCooking(index): void {
    if (confirm('Remove?')) {
      this.recipeCookingGroup.removeAt(index);
    }
  }
  getRecipeAsJson(): string {
    return `{"name":${JSON.stringify(this.recipeNameGroup.value)},"preparation":${JSON.stringify(this.recipePreparationGroup.value)},"cooking":${JSON.stringify(this.recipeCookingGroup.value)},"ingredientList":${JSON.stringify(this.recipeIngredientsGroup.value)}}`;
  }
}
