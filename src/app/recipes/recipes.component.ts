import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from "app/recipes/recipe.model";
import {ServerService} from "../server.service";
import {RecipeService} from "./recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipes=[];

  constructor(private serverSvc:ServerService,private recSvc:RecipeService) {}

	ngOnInit() {
    this.onFetch();
  }

  ngOnDestroy(){
    //auto fetch recipes on login
    console.log('destroyed');
    this.recSvc.removeAllRecipes();
  }

  onFetch(){
    this.serverSvc.getRecipes().subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes;
        this.recSvc.addRecipes(this.recipes);
      });
  }
}
