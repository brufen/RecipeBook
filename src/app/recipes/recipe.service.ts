import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Ingredient } from './../shared/ingredient';
import { Recipe } from './recipe';


@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [new Recipe('10-Minute Energizing Oatmeal', 'This is a delicious complete breakfast and a perfect way to start your day!', 'http://www.whfoods.com/recipeimages/10-minute-energizing-oatmeal.jpg',
    [new Ingredient("Oats", 2), new Ingredient('Raisins', 10)]),
  new Recipe('Any Time Frittata', "Don't reserve this great frittata for breakfast; it's wonderful for lunch or dinner as well!", 'http://www.whfoods.com/recipeimages/summerfrittata.jpg', []),
  new Recipe('Breakfast Bagel', 'This healthy version of an egg sandwich is a great addition to your Healthiest Way of Eating any time of day.', 'http://www.whfoods.com/recipeimages/breakfastbagel.jpg', []),
  ];

  constructor(private http: Http) { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    })
    return this.http.put('https://recipebook-b678f.firebaseio.com/recipes.json', body, { headers: headers });
  }

  fetchData() {
    return this.http.get('https://recipebook-b678f.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }
}
