import { Component } from '@angular/core';
import { NavController, PopoverController, AlertController, LoadingController } from 'ionic-angular';
import { EditRecipe } from "../edit-recipe/edit-recipe";
import { RecipesService } from "../../services/recipes";
import { Recipe } from "../../models/recipe";
import { RecipePage } from "../recipe/recipe";
import { AuthService } from "../../services/auth";
import { DatabaseOptionsPage } from "../database-options/database-options";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class Recipes {
  recipes: Recipe[];
  constructor(
      private navCtrl: NavController,
      private recipeService: RecipesService,
      private popoverCtrl: PopoverController,
      private alertCtrl: AlertController,
      private authService: AuthService,
      private loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipe();
  }
  onNewRecipe() {
    this.navCtrl.push(EditRecipe, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

  onShowOptions(event: MouseEvent) {
    const loading= this.loadingCtrl.create({
      content: 'Loading...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
        data => {
          if (!data) {
            return;
          }
          if (data.action == 'load') {
            loading.present();
            this.authService.getActiveUser().getToken()
                .then(
                    (token:string) => {
                      this.recipeService.fetchList(token)
                          .subscribe(
                              (list: Recipe[]) => {
                                loading.dismiss();
                                if (list) {
                                  this.recipes = list;
                                }
                                else {
                                  this.recipes = [];
                                }
                              },
                              error => {
                                loading.dismiss();
                                this.handleError(error.json().error);
                              }
                          )
                    }
                )
          }
          else if (data.action == 'store') {
            loading.present();
            this.authService.getActiveUser().getToken()
                .then(
                    (token:string) => {
                      loading.dismiss();
                      this.recipeService.storeList(token)
                          .subscribe(
                              () => console.log('success'),
                              error => console.log(error)
                          )
                    }
                )
          }
        }
    )
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Error',
      message: errorMessage,
      buttons: ['OK']
    });
    alert.present();
  }
}
