import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';
import { TabsPage } from "../pages/tabs/tabs";
import { Signin } from "../pages/signin/signin";
import { Signup } from "../pages/signup/signup";
import { AuthService } from "../services/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  signinPage = Signin;
  signupPage = Signup;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform,  statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController,
  private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyAEu-xNPfTWug1OdpmHIY_BOIBOTP2TNW0",
      authDomain: "ionic2-recipe-book-48e68.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage
      }
      else {
        this.isAuthenticated = false;
        this.rootPage = Signin;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(Signin);
  }
}

