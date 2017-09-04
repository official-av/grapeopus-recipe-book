import { Component, OnInit,OnDestroy } from '@angular/core';
import {ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs/Subscription';
import {ServerService} from "../server.service";
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
	private subs:Subscription;
	ingredients:ingredient[]=[];
  constructor(private shopListService:ShoppingListService,private serverSvc:ServerService) {
    this.ingredients=this.shopListService.getIngArr();
    this.shopListService.addIngredients(this.ingredients);
  }

  ngOnInit() {
		this.subs=this.shopListService.ingredientsChanged.subscribe((ingr:ingredient[])=>{
			this.ingredients=ingr;
		});
  }

	ngOnDestroy(){
		this.subs.unsubscribe();
		this.ingredients=[];
	}

	onEditItem(index:number){
	  let ingr=this.ingredients[index];
		this.shopListService.startedEdit.next(index);
    this.serverSvc.setIngrID(ingr._id);
	}

}
