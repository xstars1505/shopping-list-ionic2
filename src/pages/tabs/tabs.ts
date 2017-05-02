import { Component } from '@angular/core';

import { Recipes } from "../recipes/recipes";
import { ShoppingList } from "../shopping-list/shopping-list";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  slPage = ShoppingList;
  recipesPage = Recipes;



}
