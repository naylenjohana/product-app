import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { PerfilDetallePage } from "../perfil-detalle/perfil-detalle";
import { SessionServiceProvider } from "../../providers/session-service/session-service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public userData: SessionServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  logout() {
    this.userData.logout();      
    this.navCtrl.setRoot(LoginPage)
    .catch((err: any) => {
      console.log(`Error al generar Root: ${err}`);
    });
  }

  editPerson(){
    console.log("editar")
    let editProfile = this.modalCtrl.create(PerfilDetallePage, {email: "email@email.com"});
    editProfile.onDidDismiss(data => {
      console.log(data);
    });
    editProfile.present();

  }

}
