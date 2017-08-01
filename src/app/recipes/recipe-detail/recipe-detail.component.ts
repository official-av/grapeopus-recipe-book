import { Component, OnInit} from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipes.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	recipeDetails:Recipe;
	recId:number;
  constructor(private recpService:RecipeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
		this.route.params.subscribe(
			(params:Params)=>{
				this.recId=+params['id'];
				this.recipeDetails=this.recpService.getRecipeDetails(this.recId);
			}
		)
		
  }

	addToList(){
		this.recpService.addToShopList(this.recipeDetails.ingredients);
	}
	
	onDelete(){
		this.recpService.removeRecipe(this.recId);
		this.router.navigate(['/recipes']);
	}
}
