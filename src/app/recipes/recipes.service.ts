import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';
import {ServerService} from "../server.service";

@Injectable()
export class RecipeService{
	recipesChanged=new Subject<Recipe[]>();

	constructor(private shopListService:ShoppingListService,private serverSvc:ServerService){

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
		this.serverSvc.addRecipe(recipe).subscribe(
		  data=>console.log('successful'),
		  error=>console.log(error)
    )
	}

	addRecipes(recipe:Recipe[]){
		this.recipes.push(...recipe);
		this.recipesChanged.next(this.recipes.slice());
	}

	updateRecipe(index:number,newRec:Recipe){
		this.recipes[index]=newRec;
		this.recipesChanged.next(this.recipes.slice());
		this.serverSvc.updateRecipe(newRec).subscribe(
		  data=>console.log(data),
      error=>console.log(error)
    )
	}

	removeRecipe(index:number){
		this.recipes.splice(index,1);
		this.recipesChanged.next(this.recipes.slice());
		this.serverSvc.deleteRecipe().subscribe(
		  data=>console.log(data),
      error=>console.log(error)
    );
	}

	removeAllRecipes(){
	  this.recipes=[];
  }
}
