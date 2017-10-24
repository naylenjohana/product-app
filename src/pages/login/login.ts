import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterUserPage } from '../register-user/register-user';
import { ChangePassPage } from '../change-pass/change-pass';
import { ProductListPage } from "../product-list/product-list";
import { SessionServiceProvider } from "../../providers/session-service/session-service";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: SessionServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * onClickLogin(): Método para el procedimiento de autenticación 
   */
  onClickLogin() {
    this.userData.login();
    this.navCtrl.setRoot(ProductListPage);
  }

  /**
   * onClickRestore(): Método para el procedimiento de resstablecer contraseña
   */
  onClickRestore() {
    this.navCtrl.push(ChangePassPage);
  }

  /**
   * onClickRestore(): Método para registrar un nuevo usuario
   */
  onClickregister() {
    this.navCtrl.push(RegisterUserPage);
  }

}
