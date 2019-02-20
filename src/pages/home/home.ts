import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public teste: MenuController) {

  }

  login(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  ionViewWillLoad(){
    this.teste.swipeEnable(false);
  }

  ionViewWillLeave(){
    this.teste.swipeEnable(true);
  }

}
