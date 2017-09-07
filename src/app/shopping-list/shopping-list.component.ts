import { Component, OnInit,OnDestroy } from '@angular/core';
import {ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {ServerService} from "../server.service";
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import * as fromApp from '../store/app.reducers';
import * as ShoppingListActions from "./store/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit,OnDestroy {
	ShopListState:Observable<{ingredients:ingredient[]}>;
  IngrArr:ingredient[];
  ingrID:string;

  constructor(private shopListService:ShoppingListService,private serverSvc:ServerService,private store:Store<fromApp.AppState>) {}

  ngOnInit() {
    if(localStorage.getItem('firstLogin')==='true'){
    this.IngrArr=this.shopListService.getIngArr();
    }
    this.ShopListState=this.store.select('shoppingList');
  }

	ngOnDestroy(){
    localStorage.setItem('firstLogin','false');
	}

	onEditItem(index:number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    this.ShopListState.subscribe(
	    data=>{this.ingrID=data.ingredients[index].ingrid;}
    ).unsubscribe();
		this.shopListService.startedEdit.next(index);
    this.serverSvc.setIngrID(this.ingrID);
	}

}
