import { Component, OnInit} from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import {Store} from "@ngrx/store";
import * as fromRecipe from '../store/recipe.reducers';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');

  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
