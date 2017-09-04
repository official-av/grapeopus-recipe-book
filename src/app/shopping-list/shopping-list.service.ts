import { ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import {ServerService} from "../server.service";
import {Injectable} from "@angular/core";
import {ToastsManager} from "ng2-toastr";

@Injectable()
export class ShoppingListService{
	startedEdit=new Subject<number>();
	ingredientsChanged=new Subject<ingredient[]>();
	private ingredients:ingredient[]=[];

	constructor(private serverSvc:ServerService,private toastr:ToastsManager) {}

	 getIngArr() {
	  this.serverSvc.getIngr().subscribe(
      (ingr:ingredient[])=>{
        this.ingredients=ingr},
      error=>console.log(error)
    )
		return this.ingredients.slice();
	 }

	getIngredient(index:number){
		return this.ingredients[index];
	}

	updateIngredient(index:number,ingr:ingredient){
		this.ingredients[index]=ingr;
		ingr._id=this.serverSvc.getIngrID();
		this.ingredientsChanged.next(this.ingredients.slice());
		this.serverSvc.updateIngr(ingr).subscribe(
		  data=>
        this.toastr.success('Ingredient updated successfully!', 'Success'),
      error=>console.log(error)
    );
	}

	addIngredient(ingr:ingredient){
    this.ingredients.push(ingr);
    this.ingredientsChanged.next(this.ingredients.slice());
		this.serverSvc.addIngr(ingr).subscribe(
		  data=>
        this.toastr.success('Ingredient added successfully!', 'Success'),
      error=>console.log(error)
    );
	}

	addIngredients(ingrArr:ingredient[]){
		this.ingredients.push(...ingrArr);
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	removeIngredient(index:number){
		this.ingredients.splice(index,1);
		this.ingredientsChanged.next(this.ingredients.slice());
		this.serverSvc.deleteIngr().subscribe(
		  data=>
        this.toastr.success('Ingredient deleted successfully!', 'Success'),
      error=>console.log('failure')
    )
	}

  removeIngredients(){
    this.ingredientsChanged.next([]);
    this.serverSvc.deleteIngrs().subscribe(
      data=>
        this.toastr.success('Ingredients deleted successfully!', 'Success'),
      error=>console.log('failure')
    )
  }
}
