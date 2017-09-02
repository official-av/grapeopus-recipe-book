import { Component, OnInit} from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipes.service';
import {ShoppingRoutingModule} from "../../shopping-list/shopping-routing.module";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {AuthService} from "../../auth/auth.service";
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	recipeDetails:Recipe;
	recId:number;
	toggle=false;
  constructor(private recpService:RecipeService,private route:ActivatedRoute,private router:Router,private shopListService:ShoppingListService,private authSvc:AuthService) { }

  ngOnInit() {
		this.route.params.subscribe(
			(params:Params)=>{
				this.recId=+params['id'];
				this.recipeDetails=this.recpService.getRecipeDetails(this.recId);
			}
		)

  }

	addToList(){
		for(let ingredient of this.recipeDetails.ingredients){
		  ingredient.belongsTo=this.authSvc.getUID();
		  this.shopListService.addIngredient(ingredient);
    }
	}

	onDelete(){
		this.recpService.removeRecipe(this.recId);
		this.router.navigate(['/recipes']);
	}

	toggledrop(){
	  this.toggle=!this.toggle;
  }
}
