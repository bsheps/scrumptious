export interface RecipeI{
    name: string;
    ingredientList:IngredientI[];
    preparation: string[];
    cooking: string[];
}

export interface IngredientI {
    name: FoodName;
    amount: number;
    unit: UnitOfMeasure;
    type: GroceryType;
}
//not really using this atm
type FoodName = 'chicken' | 
'butternut squash' | 
'leek' | 
'celery stalks' |
'bacon' |
'chicken stock' |
'creme frache' |
'rosemary' | 
'salt' | 
'pepper' |
'olive oil' |
'rice';

type UnitOfMeasure ='gram'|'ounce'|'cup'|'tbsp'|'tsp' |'count' | 'quart';

type GroceryType ='cold'|'dry'|'frozen'|'produce';