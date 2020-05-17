import { Component, Inject } from '@angular/core';
import { IngredientI } from 'src/interfaces/recipe-interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-grocerylistdialog',
  templateUrl: './grocerylistdialog.component.html',
  styleUrls: ['./grocerylistdialog.component.scss']
})
export class GroceryListDialog{
  cold:IngredientI[]=[];
  dry:IngredientI[] =[];
  frozen:IngredientI[]=[];
  produce:IngredientI[]=[];

  constructor(public dialog: MatDialogRef<GroceryListDialog>, @Inject(MAT_DIALOG_DATA) private data){
    this.cold = this.cold.concat(this.data.filter(x =>x.type ==='cold'));
    this.dry = this.dry.concat(this.data.filter(x => x.type === 'dry'));
    this.frozen = this.frozen.concat(this.data.filter(x=>x.type==='frozen'));
    this.produce = this.frozen.concat(this.data.filter(x=>x.type==='produce'));
  }
  
}
