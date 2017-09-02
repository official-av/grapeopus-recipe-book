import {ingredient } from '../shared/ingredient.model';
export class Recipe{
	public name:string;
	public description:string;
	public imagePath:string;
	public ingredients:ingredient[];
	public _id:string;
	public addedBy:string;

	constructor(name:string,desc:string,imagePath:string,ingredients:ingredient[],_id:string,addedBy:string){
		this.name=name;
		this.description=desc;
		this.imagePath=imagePath;
		this.ingredients=ingredients;
		this._id=_id;
		this.addedBy=addedBy;
	}
}
