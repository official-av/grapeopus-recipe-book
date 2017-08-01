import { Component, OnInit,Input} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
	@Input('curRecipe') recipe:Recipe;
	@Input() index:number;
  ngOnInit() {
  }
}
