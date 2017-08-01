import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

import {ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

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
  constructor(private shopListService:ShoppingListService) { }

  ngOnInit() {
		this.subs=this.shopListService.startedEdit.subscribe(
		(index:number)=>{
			this.editMode=true;
			this.itemToEdit=index;
			this.editedItem=this.shopListService.getIngredient(index);
			this.shopForm.setValue({
				'name':this.editedItem.name,
				'amount':this.editedItem.amount
			});
		}
		)
  }
	
	ngOnDestroy(){
		this.subs.unsubscribe();
	}

	onSubmit(form:NgForm){		
		const value=form.value;
		const newIngredient=new ingredient(value.name,value.amount);
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
}
