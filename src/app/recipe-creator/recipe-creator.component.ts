import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.scss']
})
export class RecipeCreatorComponent implements OnInit {
  ingredientType: string[] = ['cold','dry','frozen','produce'];
  unitType: string[] = ["count", "cup", "gram", "ounce", "quart", "tbsp", "tsp"];

  recipeNameGroup: FormControl;
  recipeIngredientsGroup:FormArray;
  recipePreparationGroup: FormArray;
  recipeCookingGroup:FormArray;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.recipeNameGroup = this.fb.control('',Validators.required);
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

  addIngredientFormGroup():FormGroup{
    return this.fb.group({
      name: ['', Validators.required],
      amount: [-1, [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  addPreparationFormControl():FormControl{
    return this.fb.control('', Validators.required);
  }

  addCookingFormControl():FormControl{
    return this.fb.control('', Validators.required);
  }
  addIngredient():void{
    this.recipeIngredientsGroup.push(this.addIngredientFormGroup());
  }
  removeIngredient(index:number):void{
    this.recipeIngredientsGroup.removeAt(index);
  }
  addPrepration():void{
    this.recipePreparationGroup.push(this.addPreparationFormControl());
  }
  removePreparation(index:number):void{
    this.recipePreparationGroup.removeAt(index);
  }
  addCookingInstruction():void{
    this.recipeCookingGroup.push(this.addCookingFormControl());
  }
  removeCooking(index):void{
    this.recipeCookingGroup.removeAt(index);
  }
  getRecipeAsJson():string{
    return `{"name":${JSON.stringify(this.recipeNameGroup.value)},"preparation":${JSON.stringify(this.recipePreparationGroup.value)},"cooking":${JSON.stringify(this.recipeCookingGroup.value)},"ingredientList":${JSON.stringify(this.recipeIngredientsGroup.value)}}`;
  }
}
