import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { FormGroup,FormArray,FormControl,Validators } from '@angular/forms';
import {RecipeService} from '../recipes.service';
import {Recipe} from '../recipe.model';
import {Store} from "@ngrx/store";
import * as fromRecipe from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
  units=['pcs','mg','tbsp','tsp','cups'];
	id:number;
	editMode=false;
	recipe:Recipe;
	recipeForm:FormGroup;
	recIngredients=new FormArray([]);
  constructor(private route:ActivatedRoute,private recipeService:RecipeService, private router:Router,private store:Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
		this.route.params.subscribe(
			(params:Params)=>{
				this.id=+params['id'];
				this.editMode=params['id']!=null;
				this.initForm();
			}
		)
  }

	private initForm(){
		let recipeName='';
		let recImgPath='';
		let recDesc='';
		if(this.editMode){
			this.store.select('recipes').take(1).subscribe(
        (recipeState:fromRecipe.State)=>{
          this.recipe=recipeState.recipes[this.id];
          recipeName=this.recipe.name;
          recImgPath=this.recipe.imagePath;
          recDesc=this.recipe.description;
          if(this.recipe['ingredients']){
            for (let ingr of this.recipe.ingredients){
              this.recIngredients.push(new FormGroup({
                'name':new FormControl(ingr.name,Validators.required),
                'amount':new FormControl(ingr.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
                'unit':new FormControl(ingr.unit,[Validators.required]),
              }))
            }
          }
        }
      )
		}

		this.recipeForm=new FormGroup({
			'name':new FormControl(recipeName,Validators.required),
			'imagePath':new FormControl(recImgPath,Validators.required),
			'description':new FormControl(recDesc,Validators.required),
			'ingredients':this.recIngredients
		});
	}

	onSubmit(){
	  const newRecipe=new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],this.recipeForm.value['imagePath'],this.recipeForm.value['ingredients'],null,null);
		if(this.editMode){
			this.recipeService.updateRecipe(this.id,this.recipe);
		} else {
			this.recipeService.addRecipe(newRecipe);
		}
		this.onCancel();
	}

	onAddIngr(){
		(<FormArray>this.recipeForm.get('ingredients')).push(
			new FormGroup({
			'name':new FormControl(null,Validators.required),
			'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'unit':new FormControl(null,[Validators.required]),
		})
		);
	}

	onCancel(){
		this.recipeForm.reset();
		this.router.navigate(['../'],{relativeTo:this.route});
	}

	onDelete(index:number){
		(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
	}

	getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
