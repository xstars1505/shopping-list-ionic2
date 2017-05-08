import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditRecipe } from "../edit-recipe/edit-recipe";
import { RecipesService } from "../../services/recipes";
import { Recipe } from "../../models/recipe";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class Recipes {
  recipes: Recipe[];
  constructor(
      private navCtrl: NavController,
      private recipeService: RecipesService
  ) {}

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipe();
  }
  onNewRecipe() {
    this.navCtrl.push(EditRecipe, {mode: 'New'});
  }

  onLoadRecipe() {

  }

}
