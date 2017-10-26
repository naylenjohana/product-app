import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Product} from '../../models/product';
@Injectable()
export class FirebaseServiceProvider {

  users: Observable<any[]>;
  products:Observable<any[]>;

  constructor(public http: Http, public db: AngularFireDatabase) {
    this.users = db.list('users').valueChanges();
    this.products=db.list('products').valueChanges();
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

  deleteUser(idUser: string) {
    this.db.object(`/users/${idUser}`).remove();
  }

  addProduct(product:Product) 
  {   
    this.db.object(`/products/${product.id}`).set(product);
  }

  updateProduct(product:Product)
  {    
    this.db.object(`/products/${product}`).update(product);
  }

  deleteProduct(idproduct: string) {
    this.db.object(`/users/${idproduct}`).remove();
  }

}
