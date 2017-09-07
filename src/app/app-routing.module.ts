import { Routes,RouterModule,PreloadAllModules } from '@angular/router';
import {NgModule} from '@angular/core';
import { HomeComponent } from './core/home/home.component';
import {AuthGuard} from './auth/auth-guard.service';
import {LoggedinGaurd} from "./auth/loggedin-gaurd.service";

const appRoutes:Routes=[
	{	path:'', component:HomeComponent,pathMatch:'full',canActivate:[LoggedinGaurd]},
	{	path:'recipes', loadChildren:'./recipes/recipes.module#RecipesModule',canActivate:[AuthGuard],canLoad:[AuthGuard]},
	{	path:'shopping-list', loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule',canLoad:[AuthGuard]},
	 ];

@NgModule({
	imports:[RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
	exports:[RouterModule]
})

export class AppRoutingModule{
}
