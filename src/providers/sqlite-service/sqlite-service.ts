import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Platform} from "ionic-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


@Injectable()
export class SqliteServiceProvider {


  public database: SQLiteObject;
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
        longitude REAL,
        image TEXT
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

  getProducts() {
    return this.isReady()
      .then(() => {
        return this.database.executeSql("SELECT * FROM products", [])
          .then(data => {
            let products = [];
            for(let i=0; i<data.rows.length; i++){
              products.push(data.rows.item(i));
            }
            return products;
          })
          .catch(err => console.error(err));
      })
      .catch(err=>console.error("not ready: ", err));
  }

  getProduct(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`SELECT * FROM products WHERE id = ${id}`, [])
          .then(data => {
            if(data.rows.length) return data.rows.item(0);
            return null;
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  
  
  updateProduct(id:number, name: string,type:string,quantity:number,price:number, latitude:string
    ,lenght:string,image:string) {
      return this.isReady()
        .then(() => {
          return this.database.executeSql(`UPDATE products SET name=('${name}') WHERE id=('${id}');`, {})
            .then(result => {
              if(result.insertId) return this.getProduct(result.insertId);
            })
            .catch(err => console.error(err));
        });
    }


    addProduct(name: string,type:string,quantity:number,price:number, latitude:string
      ,lenght:string,image:string) {
      return this.isReady()
        .then(() => {
          return this.database.executeSql(`INSERT INTO products(name,type,quantity,price,latitude,lenght,image)
           VALUES ('${name}','${type}','${quantity}','${price}','${latitude}'
           ,'${lenght}','${image}');`, {})
            .then(result => {
              if(result.insertId) return this.getProduct(result.insertId);
            })
            .catch(err => console.error(err));
        });
    }
  

  deleteProduct(id: number) {
    return this.isReady()
      .then(() => {
        return this.database.executeSql(`DELETE FROM products WHERE id = ${id}`, [])
      })
      .catch(err => console.error(err));
  }

  

  private isReady() {
    return new Promise((resolve, reject) => {
      if(this.dbReady.getValue()) {
        resolve();
      } else {
        this.dbReady.subscribe(ready => {
          if(ready) resolve();
        });
      }
    })
  }

}
  

