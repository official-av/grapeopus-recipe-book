import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../auth/auth-guard.service';
import {ShoppingListComponent} from './shopping-list.component';
const shopRoute=[
	{	path:'',component:ShoppingListComponent,canActivate:[AuthGuard]},
];
@NgModule({
	imports:[RouterModule.forChild(shopRoute)],
	exports:[RouterModule]
})
export class ShoppingRoutingModule{
	
}