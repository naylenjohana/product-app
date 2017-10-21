import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Platform} from "ionic-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

/*
  Generated class for the SqliteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliteServiceProvider {


  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform, private sqlite: SQLite) {

    this.platform.ready().then(()=>{
       this.sqlite.create({
          name: 'diplomado.db',
          location: 'default'
        })
        .then((db: SQLiteObject)=>{
          this.database = db;
          this.createTables()
            .then(() => {
              this.dbReady.next(true);
            })
            .catch(err=>console.error("error detected creating tables: ", err));
        })
      });

  }


  private createTables() {

    let arrTables = [
      `CREATE TABLE IF NOT EXISTS product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        type TEXT,
        quantity REAL,
        price REAL,
        latitude REAL,
        longitude REAL
      );`,

      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT,
        firstaname TEXT,
        lastname TEXT,
        phone TEXT
      );`
    ];

    return this.database.sqlBatch(arrTables)
      .then(result => {
        console.log("Tables Created OK.")
      })
      .catch(err=>console.error("ERROR creating tables: ", err));
  
  }
  
}
