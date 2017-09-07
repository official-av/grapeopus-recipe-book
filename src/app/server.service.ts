import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {Recipe} from './recipes/recipe.model';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth/auth.service';
import 'rxjs/Rx';
import {ingredient} from "./shared/ingredient.model";
import {ErrorService} from "./errors/error.service";

@Injectable()
export class ServerService {
  recId: string;
  ingrID: string;

  constructor(private http: Http, private authService: AuthService, private errorService: ErrorService) {
  }


  setRecipeId(recId: string) {
    this.recId = recId;
  }

  //endpoints call for recipes

  getRecipes() {
    const authToken = this.authService.getTk();
    const headers = new Headers({'x-access-token': authToken});
    const uid = this.authService.getUID();
    return this.http.get('http://Grapeopus-env.nty2pagqgi.ap-south-1.elasticbeanstalk.com/recipes/' + uid, {headers: headers}).map(
      (response: Response) => {
        const recipes = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = '';
          }
        }
        return recipes;
      }
    ).catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
    ;
  }

  addRecipe(recipe: Recipe) {
    const authToken = this.authService.getTk();
    const headers = new Headers({'x-access-token': authToken});
    recipe.addedBy = this.authService.getUID();
    return this.http.post('http://Grapeopus-env.nty2pagqgi.ap-south-1.elasticbeanstalk.com/recipes', recipe, {headers: headers}).map(
      (response: Response) => response.json()
    ).catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  updateRecipe(recipe: Recipe) {
    const authToken = this.authService.getTk();
    const headers = new Headers({'x-access-token': authToken});
    return this.http.put('http://Grapeopus-env.nty2pagqgi.ap-south-1.elasticbeanstalk.com/recipes/' + this.recId, recipe, {headers: headers}).map(
      (response: Response) => response.json()
    ).catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  deleteRecipe() {
    const authToken = this.authService.getTk();
    const headers = new Headers({'x-access-token': authToken});
    return this.http.delete('http://Grapeopus-env.nty2pagqgi.ap-south-1.elasticbeanstalk.com/recipes/' + this.recId, {headers: headers}).map(
      (response: Response) => response.json()
    ).catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  //endpoints call for shopping list
  getIngr() {
    const authToken = this.authService.getTk();
    const headers = new Headers({'x-access-token': authToken});
    const uid = this.authService.getUID();
    return this.http.get('http://Grapeopus-env.nty2pagqgi.ap-south-1.elasticbeanstalk.com/shopList/' + uid, {headers: headers}).map(
      (response: Response) => {
        const ingr = response.json();
        return ingr;
      }).catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  addIngr(ingr: ingredient) {
    const authToken = this.authService.getTk();
    const headers = new Headers({'x-access-token': authToken});
    return this.http.post('http://Grapeopus-env.nty2pagqgi.ap-south-1.elasticbeanstalk.com/shopList', ingr, {headers: headers}).map(
      (response: Response) => response.json()).catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  updateIngr(ingr: ingredient) {
    const authToken = this.authService.getTk();
    const headers = new Headers({'x-access-token': authToken});
    return this.http.put('http://Grapeopus-env.nty2pagqgi.ap-south-1.elasticbeanstalk.com/shopList/' + ingr.ingrid, ingr, {headers: headers}).map(
      (response: Response) => response.json()
    ).catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  deleteIngr() {
    const authToken = this.authService.getTk();
    const headers = new Headers({'x-access-token': authToken});
    const ingrid = this.getIngrID();
    return this.http.delete('http://Grapeopus-env.nty2pagqgi.ap-south-1.elasticbeanstalk.com/shopList/' + ingrid, {headers: headers}).map(
      (response: Response) => response.json()).catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  deleteIngrs() {
    const authToken = this.authService.getTk();
    const headers = new Headers({'x-access-token': authToken});
    const uid = this.authService.getUID();
    return this.http.delete('http://Grapeopus-env.nty2pagqgi.ap-south-1.elasticbeanstalk.com/shopList/all/'+uid, {headers: headers}).map(
      (response: Response) => response.json()).catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
  }

  setIngrID(ingrID: string) {
    this.ingrID = ingrID;
  }

  getIngrID() {
    return this.ingrID;
  }
}
