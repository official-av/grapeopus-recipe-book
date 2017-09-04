import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

import {ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {AuthService} from "../../auth/auth.service";

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
  constructor(private shopListService:ShoppingListService,private authSvc:AuthService) { }

  ngOnInit() {
		this.subs=this.shopListService.startedEdit.subscribe(
		(index:number)=>{
			this.editMode=true;
			this.itemToEdit=index;
			this.editedItem=this.shopListService.getIngredient(index);
			this.shopForm.setValue({
				'name':this.editedItem.name,
				'amount':this.editedItem.amount,
        'unit':this.editedItem.unit
			});
		}
		)
  }

	ngOnDestroy(){
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
