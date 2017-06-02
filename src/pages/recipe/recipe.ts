import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Recipe } from "../../models/recipe";
import { EditRecipe } from "../edit-recipe/edit-recipe";
import { ShoppingListService } from "../../services/shopping-list";
import { RecipesService } from "../../services/recipes";
import { ShoppingList } from "../shopping-list/shopping-list";


@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  recipe: Recipe;
  index: number;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private slService: ShoppingListService,
      private recipeService: RecipesService
  ) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onAddingIngredients() {
    this.slService.addItems(this.recipe.ingredients);
    this.navCtrl.push(ShoppingList);
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipe, {mode: 'Edit', recipe: this.recipe, index: this.index});
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
}
