import { Component, OnInit,Input} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {ServerService} from "../../../server.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
	@Input('curRecipe') recipe:Recipe;
	@Input() index:number;
	constructor(private serverSvc:ServerService) {}
  ngOnInit() {
  }

  storeRecId(){
    this.serverSvc.setRecipeId(this.recipe.recID);
  }
}
