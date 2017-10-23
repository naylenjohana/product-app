import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/**
 * Generated class for the PerfilDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-detalle',
  templateUrl: 'perfil-detalle.html',
})
export class PerfilDetallePage {

  myForm: FormGroup;
  email: string;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams, public alertctrl: AlertController) {
    this.myForm = this.createForm();
    this.email = this.navParams.get('email');

  }

  private createForm() {
    return this.formBuilder.group({
      surename: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      phone: ['', Validators.compose([Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilDetallePage');
  }

  public dismiss() {
    let data = {};
    this.viewCtrl.dismiss(data);
  }

  saveForm() {
    let confirm = this.alertctrl.create({
      title: '¡Actualizar Datos!',
      message: 'Esta seguro que quiere editar los datos de su perfil?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.dismiss();
          }
        }
      ]
    });
    confirm.present();
  }

}
