import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';
import {ServerService} from "../server.service";
import {ToastsManager} from "ng2-toastr";
import * as fromRecipe from './store/recipe.reducers';
import {Store} from "@ngrx/store";
import * as RecipeActions from './store/recipe.actions';
import {AuthService} from "../auth/auth.service";
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor( private serverSvc: ServerService, private toastr: ToastsManager,private store:Store<fromRecipe.State>,private authSvc:AuthService) {

  }

  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
    //slice used to provide a copy of the array not the exact one
  }

  getRecipeDetails(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
    console.log('subs');
    this.serverSvc.addRecipe(recipe).subscribe(
      data => {
        recipe.recID=data.recID;
        recipe.addedBy=this.authSvc.getUID();
        this.store.dispatch(new RecipeActions.AddRecipe(recipe));
        this.toastr.success('Recipe added successfully!', 'Success');
      },
      error => console.log(error)
    );
  }

  addRecipes(recipe: Recipe[]) {
    this.recipes.push(...recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRec: Recipe) {
    this.recipes[index] = newRec;
    this.recipesChanged.next(this.recipes.slice());
    this.serverSvc.updateRecipe(newRec).subscribe(
      data => {
        this.store.dispatch(new RecipeActions.UpdateRecipe({index:index,updatedRecipe:newRec}));
        this.toastr.success('Recipe updated successfully!', 'Success');
        console.log(data);
      },
      error => console.log(error)
    )
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
    this.serverSvc.deleteRecipe().subscribe(
      data => {
        this.store.dispatch(new RecipeActions.DeleteRecipe(index));
        this.toastr.success('Recipe deleted successfully!', 'Success');
      },
      error => console.log(error)
    );
  }

  removeAllRecipes() {
    this.recipes = [];
  }
}
