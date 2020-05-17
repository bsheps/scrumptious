import { Component, OnInit, Inject } from '@angular/core';
import { RecipeI, IngredientI } from 'src/interfaces/recipe-interface';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeI[]= []
  recipeDetails:RecipeI;
  groceryList: RecipeI[] = [];
  private recipeUrl = 'assets/recipes.json';
  constructor(private http: HttpClient, private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.http.get(this.recipeUrl).subscribe(data=>{
      this.recipes = Array.isArray(data) ? data : [data];
      this.recipes.sort(byName);
    });
  }

  openRecipe(recipe:RecipeI):void{
    console.log("recipe opened: ", recipe);
    this.recipeDetails = recipe;
  }

  addRecipeToGroceryList(recipe:RecipeI){
    this.groceryList.push(recipe);
  }

  showGroceryList(){
    let allIngredients = [];
    this.groceryList.forEach(recipe=>{
      allIngredients = allIngredients.concat(recipe.ingredientList);
    })
    allIngredients.sort(byName).sort(byType);
    console.log("all ingredients: ", allIngredients)
    this.dialog.open(GroceryListDialog,{
      data: allIngredients
    })
  }
  clearGroceryList():void{
    this.groceryList = [];
  }
}

@Component({
  template: `
    <h1 mat-dialog-title>Grocery List </h1>
    <div mat-dialog-content>
      <h2>Cold</h2>
      <ul>
        <li *ngFor="let ing of cold">{{ing.name}} - {{ing.amount}} {{ing.unit}}</li>
      </ul>
      <h2>Dry</h2>
      <ul>
        <li *ngFor="let ing of dry">{{ing.name}} - {{ing.amount}} {{ing.unit}}</li>
      </ul>
      <h2>Frozen</h2>
      <ul>
        <li *ngFor="let ing of frozen">{{ing.name}} - {{ing.amount}} {{ing.unit}}</li>
      </ul>
      <h2>Produce</h2>
      <ul>
        <li *ngFor="let ing of produce">{{ing.name}} - {{ing.amount}} {{ing.unit}}</li>
      </ul>
    </div>
    <div mat-dialog-actions>
      <button mat-stroked-button color="primary" (click)="dialog.close()">Close</button>
    </div>
  `
})
export class GroceryListDialog{
  cold:IngredientI[]=[];
  dry:IngredientI[] =[];
  frozen:IngredientI[]=[];
  produce:IngredientI[]=[];
  constructor(public dialog: MatDialogRef<GroceryListDialog>, @Inject(MAT_DIALOG_DATA) private data){
    console.log("data: ", data);
    this.cold = this.cold.concat(data.filter(x =>x.type ==='cold'));
    this.dry = this.dry.concat(data.filter(x => x.type === 'dry'));
    this.frozen = this.frozen.concat(data.filter(x=>x.type==='frozen'));
    this.produce = this.frozen.concat(data.filter(x=>x.type==='produce'));
  }
}

function byName(a:RecipeI, b:RecipeI):number{
  return a.name.localeCompare(b.name);
}
function byType(a,b):number{
  return a.type.localeCompare(b.type);
}
