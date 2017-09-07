import { ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import {ServerService} from "../server.service";
import {Injectable} from "@angular/core";
import {ToastsManager} from "ng2-toastr";
import {Store} from "@ngrx/store";
import * as ShopListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class ShoppingListService{
	startedEdit=new Subject<number>();
	subs:Subscription;
	private ingredients:ingredient[]=[];

	constructor(private serverSvc:ServerService,private toastr:ToastsManager,private store:Store<fromApp.AppState>) {}

	 getIngArr() {
	  this.serverSvc.getIngr().subscribe(
      (ingr:ingredient[])=>{
        this.ingredients=ingr;
        this.store.dispatch(new ShopListActions.AddIngredients(ingr));
        },
      error=>console.log(error)
    )
		return this.ingredients.slice();
	 }

  addIngredient(ingr:ingredient){
    this.subs=this.serverSvc.addIngr(ingr).subscribe(
      data=>{
        ingr.ingrid=data.ingrID;
        this.store.dispatch(new ShopListActions.AddIngredient(ingr));
        this.toastr.success('Ingredient added successfully!', 'Success')},
      error=>console.log(error)
    );
  }

	updateIngredient(index:number,ingr:ingredient){
		this.ingredients[index]=ingr;
		ingr.ingrid=this.serverSvc.getIngrID();
		this.serverSvc.updateIngr(ingr).subscribe(
		  data=>{
		    this.store.dispatch(new ShopListActions.UpdateIngredient({ingredient:ingr}));
        this.toastr.success('Ingredient updated successfully!', 'Success')},
      error=>console.log(error)
    );
	}

	removeIngredient(index:number){
		this.serverSvc.deleteIngr().subscribe(
		  data=>{
		    this.store.dispatch(new ShopListActions.DeleteIngredient());
        this.toastr.success('Ingredient deleted successfully!', 'Success')},
      error=>console.log('failure')
    )
	}

  removeIngredients(){
    this.serverSvc.deleteIngrs().subscribe(
      data=>{
        this.store.dispatch(new ShopListActions.DeleteIngredients());
        this.toastr.success('Ingredients deleted successfully!', 'Success');},
      error=>console.log('failure')
    )
  }
}
