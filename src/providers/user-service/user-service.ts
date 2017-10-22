import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../../models/user'; 
import { SqliteServiceProvider } from '../sqlite-service/sqlite-service';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: Http, public sqLite: SqliteServiceProvider) {
    console.log('Hello UserServiceProvider Provider');
  }

  /**
   * saveUser: método que permite Crear o Editar la información de un Usuario
   * @param objUser 
   */
  saveUser(objUser: User): Promise<User> {
    let strSQL : string;
    let arrValues: Array<any>;

    if(objUser.id <= 1) {
      strSQL = `INSERT INTO user(email, password, firstaname, lastname, phone) VALUES (?,?,?,?,?);`;
      arrValues = [objUser.email, objUser.password, objUser.firstaname, objUser.lastname, objUser.phone];
    }
    else {
      strSQL = `UPDATE user SET email=?, password=?, firstaname=?, lastname=?, phone=? WHERE id= ?`;
      arrValues = [objUser.email, objUser.password, objUser.firstaname, objUser.lastname, objUser.phone, objUser.id];
    }

    return new Promise((resolve, reject) => {

      this.sqLite.database.executeSql(strSQL, arrValues)
      .then(result => {
        if(result.insertId > 0) {
          objUser.id = result.insertId;
        }
        resolve(objUser);
      })
      .catch(err => {
        reject(err);
      });
    });
    
  }

  /**
   * verifyAuthUser: Verificar si existe un usuario con la Email y la respectiva contraseña
   * @param strEmail 
   * @param strPassword 
   */
  verifyAuthUser(strEmail:string, strPassword:string) {
    let strPassencrypt = btoa(strPassword);
    let strSQL = `SELECT Count(id) AS mycount FROM user WHERE email=? AND password=?;`;
    let arrValues = [strEmail, strPassencrypt];

    return new Promise((resolve, reject) => {
      
      this.sqLite.database.executeSql(strSQL, arrValues)
      .then(result => {
        if(result.rows.item(0).mycount > 0) {
          resolve(true);
        }
        else {
          reject(false);
        }
      })
      .catch(err => {
        reject(err);
      });
    });

  }


}