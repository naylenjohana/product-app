import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterUserPage } from '../register-user/register-user';
import { ChangePassPage } from '../change-pass/change-pass';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * onClickLogin(): Método para el procedimiento de autenticación 
   */
  onClickLogin() {

  }

  /**
   * onClickRestore(): Método para el procedimiento de resstablecer contraseña
   */
  onClickRestore () {
    this.navCtrl.push(ChangePassPage);
  }

  /**
   * onClickRestore(): Método para registrar un nuevo usuario
   */
  onClickregister() {
    this.navCtrl.push(RegisterUserPage);
  }

}
