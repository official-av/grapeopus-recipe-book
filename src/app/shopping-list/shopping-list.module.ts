import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingRoutingModule } from './shopping-routing.module';

@NgModule({
	declarations:[
		ShoppingListComponent,
		ShoppingEditComponent
	],
	imports:[
		ShoppingRoutingModule,
		CommonModule,
		FormsModule
		
  ],
	bootstrap:[ShoppingListComponent]
})
export class ShoppingListModule {
	
}