import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { FormGroup,FormArray,FormControl,Validators,AbstractControl } from '@angular/forms';
import {RecipeService} from '../recipes.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
	id:number;
	editMode=false;
	recipeForm:FormGroup;
	recIngredients=new FormArray([]);
  constructor(private route:ActivatedRoute,private recipeService:RecipeService, private router:Router) { }

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
			const recipe=this.recipeService.getRecipeDetails(this.id);
			recipeName=recipe.name;
			recImgPath=recipe.imagePath;
			recDesc=recipe.description;
			if(recipe['ingredients']){
				for (let ingr of recipe.ingredients){
					this.recIngredients.push(new FormGroup({
						'name':new FormControl(ingr.name,Validators.required),
						'amount':new FormControl(ingr.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
					}))
				}
			}
		}
		
		this.recipeForm=new FormGroup({
			'name':new FormControl(recipeName,Validators.required),
			'imagePath':new FormControl(recImgPath,Validators.required),
			'description':new FormControl(recDesc,Validators.required),
			'ingredients':this.recIngredients
		});
	}
	
	onSubmit(){
//		const newRecipe=new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],this.recipeForm.value['imagePath'],this.recipeForm.value['ingredients']);
		if(this.editMode){
			this.recipeService.updateRecipe(this.id,this.recipeForm.value);
		} else {
			this.recipeService.addRecipe(this.recipeForm.value);
		}
		this.onCancel();
	}
	
	onAddIngr(){
		(<FormArray>this.recipeForm.get('ingredients')).push(
			new FormGroup({
			'name':new FormControl(null,Validators.required),
			'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
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
