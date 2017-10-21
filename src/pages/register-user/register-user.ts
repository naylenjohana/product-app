import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { User } from "../../models/user";
import { AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: UserServiceProvider, public alertCtrl: AlertController) {
    this.myForm = this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserPage');
  }

  private createForm() {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      firstname: ['', Validators.compose([Validators.maxLength(20)])],
      lastname: ['', Validators.compose([Validators.maxLength(20)])],
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

    this.userService.saveUser(objuser)
    .then(resUser => {
      console.debug(resUser);
      this.presentAlert('Bienvenido !', resUser.firstaname + ' ' + resUser.lastname + ' registrado correctamente');
    })
    .catch(err=>{
      this.presentAlert('Error', JSON.stringify(err));
    });
  }

  /**
   * presentAlert: Muestra un mensaje con el resultado del registro
   * @param strtitle 
   * @param strMessage 
   */
  private presentAlert(strtitle, strMessage) {
    const alert = this.alertCtrl.create({
      title: strtitle,
      subTitle: strMessage,
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
