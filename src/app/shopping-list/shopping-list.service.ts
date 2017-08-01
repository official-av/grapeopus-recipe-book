import { ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
export class ShoppingListService{
	startedEdit=new Subject<number>();
	ingredientsChanged=new Subject<ingredient[]>();
	private ingredients:ingredient[]=[];
	
	 getIngArr() {
		return this.ingredients.slice();
	 }
	
	getIngredient(index:number){
		return this.ingredients[index];
	}
	
	updateIngredient(index:number,ingr:ingredient){
		this.ingredients[index]=ingr;
		this.ingredientsChanged.next(this.ingredients.slice());
	}
	
	addIngredient(ingr:ingredient){
		this.ingredients.push(ingr);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
	
	addIngredients(ingrArr:ingredient[]){
		this.ingredients.push(...ingrArr);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
	
	removeIngredient(index:number){
		this.ingredients.splice(index,1);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
}