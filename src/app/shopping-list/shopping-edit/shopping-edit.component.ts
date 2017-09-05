import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {AuthService} from "../../auth/auth.service";
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit,OnDestroy {
	@ViewChild('f') shopForm:NgForm;
	subs:Subscription;
	editMode=false;
	itemToEdit:number;
	editedItem:ingredient;
	units=['pcs','mg','tbsp','tsp','cups'];

  constructor(private shopListService:ShoppingListService,private authSvc:AuthService,private store:Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.subs=this.store.select('shoppingList').subscribe(
      data=>{
        if(data.editedIngredientIndex>-1){
          this.itemToEdit=data.editedIngredientIndex;
          this.editedItem=data.editedIngredient;
          this.editMode=true;
          this.shopForm.setValue({
            'name':this.editedItem.name,
            'amount':this.editedItem.amount,
            'unit':this.editedItem.unit
          });
        }
      }
    );
  }

	ngOnDestroy(){
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subs.unsubscribe();
	}

	onSubmit(form:NgForm){
		const value=form.value;
		const belongsTo=this.authSvc.getUID();
		const newIngredient=new ingredient(value.name,value.amount,null,belongsTo,value.unit);
		if(this.editMode){
			this.shopListService.updateIngredient(this.itemToEdit,newIngredient);
		} else {
      this.shopListService.addIngredient(newIngredient);
		}
		form.reset();
			this.editMode=false;
	}

	onClear(){
		this.shopForm.reset();
		this.editMode=false;
	}

	onDelete(){
		this.shopListService.removeIngredient(this.itemToEdit);
		this.onClear();
	}

	deleteAll(){
    this.shopListService.removeIngredients();
    this.onClear();
  }
}
