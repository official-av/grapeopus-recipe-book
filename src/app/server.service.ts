import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';

import {Recipe} from './recipes/recipe.model';
import {Observable} from 'rxjs/Observable';
import { AuthService } from './auth/auth.service';
import 'rxjs/Rx';
import {ingredient} from "./shared/ingredient.model";

@Injectable()
export class ServerService{
  recId:string;
  ingrID:string;

	constructor(private http:Http,private authService:AuthService){}


  setRecipeId(recId:string){
    this.recId=recId;
  }

  //endpoints call for recipes

  getRecipes(){
	const authToken=this.authService.getTk();
	const headers=new Headers({'x-access-token':authToken});
	const uid=this.authService.getUID();
		return this.http.get('http://localhost:3000/recipes/'+uid,{headers:headers}).map(
		(response:Response)	=> {
			const recipes=response.json();
			for (let recipe of recipes) {
				if(!recipe['ingredients']){
					recipe['ingredients']='';
				console.log(recipe);
				}
			}
			console.log('executed');
			return recipes;
		}
		);
  }

  addRecipe(recipe:Recipe){
    const authToken=this.authService.getTk();
    const headers=new Headers({'x-access-token':authToken});
    recipe.addedBy=this.authService.getUID();
    return this.http.post('http://localhost:3000/recipes',recipe,{headers:headers}).map(
      (response:Response)=>response.json(),
      (error:Response)=>error.json()
    );
  }

  updateRecipe(recipe:Recipe){
    const authToken=this.authService.getTk();
    const headers=new Headers({'x-access-token':authToken});
    return this.http.put('http://localhost:3000/recipes/'+this.recId,recipe,{headers:headers}).map(
      (response:Response)=>response.json(),
      (error:Response)=>error.json()
    );
  }

  deleteRecipe(){
    const authToken=this.authService.getTk();
    const headers=new Headers({'x-access-token':authToken});
    return this.http.delete('http://localhost:3000/recipes/'+this.recId,{headers:headers}).map(
      (response:Response)=>response.json(),
      (error:Response)=>error.json()
    );
  }

  //endpoints call for shopping list
  getIngr(){
    const authToken=this.authService.getTk();
    const headers=new Headers({'x-access-token':authToken});
    const uid=this.authService.getUID();
    return this.http.get('http://localhost:3000/shopList/'+uid,{headers:headers}).map(
      (response:Response)=>{const ingr=response.json();
      console.log('i ran');
      return ingr;},
      (error:Response)=>error.json()
    );
  }
  addIngr(ingr:ingredient){
    const authToken=this.authService.getTk();
    const headers=new Headers({'x-access-token':authToken});
    return this.http.post('http://localhost:3000/shopList',ingr,{headers:headers}).map(
      (response:Response)=>response.json(),
      (error:Response)=>error.json()
    );
  }

  updateIngr(ingr:ingredient){
    const authToken=this.authService.getTk();
    const headers=new Headers({'x-access-token':authToken});
    return this.http.put('http://localhost:3000/shopList/'+ingr._id,ingr,{headers:headers}).map(
      (response:Response)=>response.json(),
      (error:Response)=>error.json()
    );
  }

  deleteIngr(){
    const authToken=this.authService.getTk();
    const headers=new Headers({'x-access-token':authToken});
    const ingrid=this.getIngrID();
    return this.http.delete('http://localhost:3000/shopList/'+ingrid,{headers:headers}).map(
      (response:Response)=>response.json(),
      (error:Response)=>error.json()
    );
  }

  setIngrID(ingrID:string){
    this.ingrID=ingrID;
  }
  getIngrID(){
    return this.ingrID;
  }
}
