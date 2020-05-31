import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeI } from 'src/interfaces/recipe-interface';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GroceryListDialog } from '../grocerylistdialog/grocerylistdialog.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Output() editRecipeEmitter: EventEmitter<RecipeI> = new EventEmitter<RecipeI>();
  recipes: RecipeI[] = []
  recipeDetails: RecipeI;
  groceryList: RecipeI[] = [];
  private recipeUrl = 'assets/recipes.json';
  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.get(this.recipeUrl).subscribe(data => {
      this.recipes = Array.isArray(data) ? data : [data];
      this.recipes.sort(byName);
    });
  }

  openRecipe(recipe: RecipeI): void {
    console.log("recipe opened: ", recipe);
    this.recipeDetails = recipe;
  }

  addRecipeToGroceryList(recipe: RecipeI) {
    this.groceryList.push(recipe);
  }

  showGroceryList() {
    let allIngredients = [];
    this.groceryList.forEach(recipe => {
      allIngredients = allIngredients.concat(recipe.ingredientList);
    })
    allIngredients.sort(byName).sort(byType);
    console.log("all ingredients: ", allIngredients)
    this.dialog.open(GroceryListDialog, {
      data: allIngredients
    })
  }
  clearGroceryList(): void {
    this.groceryList = [];
  }
  editRecipe(recipe: RecipeI) {
    this.editRecipeEmitter.emit(recipe);
  }
}

function byName(a: RecipeI, b: RecipeI): number {
  return a.name.localeCompare(b.name);
}
function byType(a, b): number {
  return a.type.localeCompare(b.type);
}
