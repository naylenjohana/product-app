import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import { RegisterUserPage } from '../register-user/register-user';
import { ChangePassPage } from '../change-pass/change-pass';
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { ProductListPage } from '../product-list/product-list';

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

  myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public formBuilder: FormBuilder, public userService: UserServiceProvider) {
    this.myForm = this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * createForm(): Función que crea el obeto para el formulario de Login
   */
  private createForm() {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(6), this.emailValidator.bind(this)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  /**
   * emailValidator(): Función para validar un Email con uexpresión regular.
   * @param control 
   */
  public emailValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && control.value !== '') {
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(control.value.toLowerCase())) {
        return { invalidEmail: true };
      }
    }
  }

  public saveForm() {

    this.userService.verifyAuthUser(this.myForm.value.email, this.myForm.value.password)
    .then(blnSuccess => {
      if(blnSuccess) {
        this.navCtrl.setRoot(ProductListPage);
      }
      else {
        this.presentAlert(false, 'Error', 'Usuario y/o contraseña inváido');
      }

      /*
      this.sessionService.setUserSession(resUser)
      .then(() =>{
        this.presentAlert(true, 'Bienvenido !', resUser.firstaname + ' ' + resUser.lastname + ' registrado correctamente');
      });
      */

    })
    .catch(err=>{
      this.presentAlert(false, 'Error', JSON.stringify(err));
    });
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

  /**
   * presentAlert: Muestra un mensaje con el resultado del registro
   * @param strtitle 
   * @param strMessage 
   */
  private presentAlert(blnSuccess, strtitle, strMessage) {
    const alert = this.alertCtrl.create({
      title: strtitle,
      subTitle: strMessage,
      buttons: [{
        text:'Aceptar',
        handler: () => {
          if(blnSuccess) {
            this.navCtrl.setRoot(ProductListPage);
          }
        }
      }]
    });
    alert.present();
  }

}
