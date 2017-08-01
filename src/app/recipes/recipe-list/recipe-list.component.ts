import { Component, OnInit,OnDestroy} from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipes.service';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
	recipes:Recipe[];
	subscription:Subscription;
  constructor(private recpService:RecipeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
		this.recipes=this.recpService.getRecipes();
		this.subscription=this.recpService.recipesChanged.subscribe(
			(recArr:Recipe[])=>{
				this.recipes=recArr;
			}
		);
  }
	
	onNewRecipe(){
		this.router.navigate(['new'],{relativeTo:this.route});
	}
	
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
