import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from "../../services/shopping-list";
import { Ingredient } from "../../models/ingredient";
import { PopoverController, LoadingController, AlertController } from "ionic-angular/index";
import { DatabaseOptionsPage } from "../database-options/database-options";
import { AuthService } from "../../services/auth";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingList {

  listItems: Ingredient[];
  constructor(
    private slService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private  alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loadItems();
  }
  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent) {
    const loading= this.loadingCtrl.create({
      content: 'Loading...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
        data => {
            if (!data) return;
          if (data.action == 'load') {
            loading.present();
            this.authService.getActiveUser().getToken()
                .then(
                    (token:string) => {
                      this.slService.fetchList(token)
                          .subscribe(
                              (list: Ingredient[]) => {
                                loading.dismiss();
                                if (list) {
                                  this.listItems = list;
                                }
                                else {
                                  this.listItems = [];
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
                      this.slService.storeList(token)
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

  private loadItems() {
    this.listItems = this.slService.getItems();
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
