import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

  products: Observable<any[]>;

  constructor(public http: Http, public db: AngularFireDatabase) {
    this.cargar_ultimo_key().subscribe();
  }

  cargar_ultimo_key() {
    return this.db.list('/users').valueChanges();

  }

  addUser(firstname: string, lastname: string, email: string, phone: number, password: string) {
    let idUsuario: string = new Date().valueOf().toString();
    let user: userInterface = {
      fisrtname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      password: password,
      id: idUsuario
    }
    this.db.object(`/users/${idUsuario}`).set(user);
  }

  updateUser(idUser: string, firstname: string, lastname: string, phone: number, password: string) {
    let user: userInterface = {
      fisrtname: firstname,
      lastname: lastname,
      phone: phone,
      password: password,
    }
    this.db.object(`/users/${idUser}`).update(user);
  }

  deleteUser(idUser: string){
    this.db.object(`/users/${idUser}`).remove();
  }

}
