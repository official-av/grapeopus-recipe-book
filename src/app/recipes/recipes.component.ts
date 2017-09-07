import {Component,OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "app/recipes/recipe.model";
import {ServerService} from "../server.service";
import {RecipeService} from "./recipes.service";
import * as fromRecipe from "./store/recipe.reducers";
import * as RecipeActions from "./store/recipe.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipes=[];

  constructor(private serverSvc:ServerService,private recSvc:RecipeService,private store:Store<fromRecipe.FeatureState>) {
  }

	ngOnInit() {
    if(localStorage.getItem('firstLoginRecipe')==='true'){
      this.onFetch();
    }
  }

  ngOnDestroy(){
    //auto fetch recipes on login
    this.recSvc.removeAllRecipes();
    localStorage.setItem('firstLoginRecipe','false');
  }

  onFetch(){
    this.serverSvc.getRecipes().subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes;
        this.store.dispatch(new RecipeActions.SetRecipes(this.recipes));
        this.recSvc.addRecipes(this.recipes);
      });
  }
}
