import {ingredient } from '../shared/ingredient.model';
export class Recipe{

	constructor(public name:string,public description:string,public imagePath:string,public ingredients:ingredient[],public recID:string,public addedBy:string){
	}
}
