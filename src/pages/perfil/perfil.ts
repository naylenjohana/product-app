import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { PerfilDetallePage } from "../perfil-detalle/perfil-detalle";
import { SessionServiceProvider } from "../../providers/session-service/session-service";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public userData: SessionServiceProvider, public sf: FirebaseServiceProvider, public alertctrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  logout() {
    let confirm = this.alertctrl.create({
      title: '¡Cerrar sesión!',
      message: 'Esta seguro que quiere cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar cierre sesión');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.userData.logout();
            this.navCtrl.setRoot(LoginPage)
              .catch((err: any) => {
                console.log(`Error al generar Root: ${err}`);
              });
          }
        }
      ]
    });
    confirm.present();
  }

  editPerson() {
    let editProfile = this.modalCtrl.create(PerfilDetallePage, { email: "email@email.com" });
    editProfile.onDidDismiss(data => {
      console.log(data);
    });
    editProfile.present();

  }

  removePerson() {
    let confirm = this.alertctrl.create({
      title: '¡Eliminar Cuenta!',
      message: 'Esta seguro que quiere eliminar la cuenta?',
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
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
