import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';
@Injectable()

export class RecipeService{
	recipesChanged=new Subject<Recipe[]>();
	constructor(private shopListService:ShoppingListService){
		
	}
	
	addToShopList(ingrArr:ingredient[]){
		this.shopListService.addIngredients(ingrArr);
	}
	
	private recipes:Recipe[]=[];
	
	getRecipes(){
		return this.recipes.slice();
		//slice used to provide a copy of the array not the exact one
	}
	
	getRecipeDetails(id:number){
		return this.recipes[id];
	}
	
	addRecipe(recipe:Recipe){
		this.recipes.push(recipe);
		this.recipesChanged.next(this.recipes.slice());
	}
	
	addRecipes(recipe:Recipe[]){
		this.recipes.push(...recipe);
		this.recipesChanged.next(this.recipes.slice());
	}
	
	updateRecipe(index:number,newRec:Recipe){
		this.recipes[index]=newRec;
		this.recipesChanged.next(this.recipes.slice());
	}
	
	removeRecipe(index:number){
		this.recipes.splice(index,1);
		this.recipesChanged.next(this.recipes.slice());
	}
}