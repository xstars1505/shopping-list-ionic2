import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms/forms";
import { AuthService } from "../../services/auth";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class Signin {

  constructor(
      public authService: AuthService,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController
  ) {}

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signin in...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
        .then(
            data => {
              loading.dismiss();
            }
        )
        .catch(
            error => {
              loading.dismiss();
              const alert = this.alertCtrl.create({
                title: 'Sign in failed',
                message: error.message,
                buttons: ['OK']
              });
              alert.present();
            }
        )
  }

}
