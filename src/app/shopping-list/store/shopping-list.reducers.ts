import * as ShoppingListActions from './shopping-list.actions';
import {ingredient} from "../../shared/ingredient.model";
import {DELETE_INGREDIENT, START_EDIT, STOP_EDIT} from "./shopping-list.actions";

export interface AppState {
  shoppingList:State;
}

export interface State {
  ingredients:ingredient[];
  editedIngredient:ingredient;
  editedIngredientIndex:number;
}

const initialState:State={
  ingredients:[],
  editedIngredient:null,
  editedIngredientIndex:-1
};

export function ShoppingListReducer(state=initialState, action:ShoppingListActions.ShoppingListActions) {
  switch(action.type){
    case ShoppingListActions.ADD_INGREDIENT :return {
      ...state,
      ingredients:[...state.ingredients,action.payload]
    };
    case ShoppingListActions.ADD_INGREDIENTS :return {
      ...state,
      ingredients:[...state.ingredients,...action.payload]
    }
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient=state.ingredients[state.editedIngredientIndex];
      const updatedIngredient= {
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients=[...state.ingredients];
      ingredients[state.editedIngredientIndex]=updatedIngredient;
      return{
      ...state,
      ingredients:ingredients,
        editedIngredient:null,
        editedIngredientIndex:-1
    };
    case ShoppingListActions.DELETE_INGREDIENT:
      const ingrArr=[...state.ingredients];
      ingrArr.splice(state.editedIngredientIndex,1);
      return {
      ...state,
      ingredients:ingrArr,
        editedIngredient:null,
        editedIngredientIndex:-1
    }
    case ShoppingListActions.START_EDIT:
      const editedIngredient={...state.ingredients[action.payload]};

      return {
      ...state,
        editedIngredient:editedIngredient,
        editedIngredientIndex:action.payload

    }
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient:null,
        editedIngredientIndex:-1
      }

    case ShoppingListActions.DELETE_INGREDIENTS: return initialState;

    default:
      return state;
  }
}
