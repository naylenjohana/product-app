import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import { UserServiceProvider } from "../../providers/user-service/user-service";
import { SessionServiceProvider } from '../../providers/session-service/session-service';
import { User } from "../../models/user";
import { AlertController } from 'ionic-angular';
import { ProductListPage } from '../product-list/product-list';

/**
 * Generated class for the RegisterUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: UserServiceProvider, public alertCtrl: AlertController, private sessionService: SessionServiceProvider) {
    this.myForm = this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserPage');
  }

  private createForm() {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(6), this.emailValidator.bind(this)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      firstname: ['', Validators.compose([Validators.minLength(3)])],
      lastname: ['', Validators.compose([Validators.minLength(3)])],
      phone: ['', Validators.compose([Validators.maxLength(10)])],
    });
  }

  /**
   * saveForm: Guarda la información del formulario de Registro
   */
  public saveForm() {
    let objuser = new User();

    objuser.email = this.myForm.value.email;
    objuser.password = this.myForm.value.password;
    objuser.firstaname = this.myForm.value.firstname;
    objuser.lastname = this.myForm.value.lastname;
    objuser.phone = this.myForm.value.phone;

    this.userService.saveUser(objuser)
    .then(resUser => {
      console.debug(resUser);
      this.sessionService.setUserSession(resUser)
      .then(() =>{
        this.presentAlert(true, 'Bienvenido !', resUser.firstaname + ' ' + resUser.lastname + ' registrado correctamente');
      });

    })
    .catch(err=>{
      this.presentAlert(false, 'Error', JSON.stringify(err));
    });
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


  public emailValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && control.value !== '') {
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(control.value.toLowerCase())) {
        return { invalidEmail: true };
      }
    }
  }

}
