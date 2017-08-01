import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import {Recipe} from './recipes/recipe.model';
import {Observable} from 'rxjs/Observable';
import { AuthService } from './auth/auth.service';
import 'rxjs/Rx';
@Injectable()
export class ServerService{
	constructor(private http:Http,private authService:AuthService){}
	
	saveRecipes(recipes:Recipe[]): Observable<any>{
		const authToken=this.authService.getTk();
		const headers=new Headers({'Content-Type':'application/json'});
		return this.http.put('https://av-recipe-book.firebaseio.com/recipes.json?auth='+authToken,recipes,{headers:headers});
	}
	
	getRecipes(){		
	const authToken=this.authService.getTk();
		return this.http.get('https://av-recipe-book.firebaseio.com/recipes.json?auth='+authToken).map(
		(response:Response)	=> {
			const recipes=response.json();
			for (let recipe of recipes) {
				if(!recipe['ingredients']){
					recipe['ingredients']='';
				console.log(recipe);
				}
			}
			return recipes;
		}
		);
	}
}