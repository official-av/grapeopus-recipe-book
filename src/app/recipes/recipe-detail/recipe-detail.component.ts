import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipes.service';
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {AuthService} from "../../auth/auth.service";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import * as fromRecipe from '../store/recipe.reducers';
import {Recipe} from "../recipe.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  recipe:Recipe;
  recId: number;
  subs:Subscription;
  toggle = false;

  constructor(private recpService: RecipeService, private route: ActivatedRoute, private router: Router, private shopListService: ShoppingListService, private authSvc: AuthService,private store:Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recId = +params['id'];
        this.recipeState = this.store.select('recipes');
       this.subs= this.recipeState.subscribe(
          data=>{
            this.recipe=data.recipes[this.recId];
          }
        )
      }
    )

  }

  addToList() {
    this.recipeState.take(1).subscribe(
      (recipeState:fromRecipe.State)=>{
        for (let ingredient of recipeState.recipes[this.recId].ingredients) {
          ingredient.belongsTo = this.authSvc.getUID();
          this.shopListService.addIngredient(ingredient);
        }}
    )
  }

  onDelete() {
    this.recpService.removeRecipe(this.recId);
    this.subs.unsubscribe();
    this.router.navigate(['/recipes']);
  }

  toggledrop() {
    this.toggle = !this.toggle;
  }
}
