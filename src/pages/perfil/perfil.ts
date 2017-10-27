import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { PerfilDetallePage } from "../perfil-detalle/perfil-detalle";
import { SessionServiceProvider } from "../../providers/session-service/session-service";
import { FirebaseServiceProvider } from "../../providers/firebase-service/firebase-service";
import { User } from "../../models/user";
import { UserServiceProvider } from "../../providers/user-service/user-service";

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

  userLoggedIn: User = new User();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public userData: SessionServiceProvider,
    public sf: FirebaseServiceProvider,
    public alertctrl: AlertController,
    public userCtrl: UserServiceProvider) {


    this.userData.getUserSession().then((user) => {
      console.log(user);
      this.userLoggedIn = user;
    })
      .catch(err => console.error(err));
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
    let editProfile = this.modalCtrl.create(PerfilDetallePage, { user: this.userLoggedIn });
    editProfile.onDidDismiss(data => {
      console.log("data " + data);
      if (data != null) {
        this.userCtrl.saveUser(data).then(() => {

          this.userData.getUserSession().then((user) => {
            this.userLoggedIn = user;
          })
            .catch(err => console.error(err));

        }).catch(err => console.error(err));
      }
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
            this.userCtrl.deleteUserAccount(this.userLoggedIn.email);
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }

}
