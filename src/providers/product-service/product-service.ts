import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SqliteServiceProvider } from "../sqlite-service/sqlite-service";
import { Product } from '../../models/product';

@Injectable()
export class ProductServiceProvider {

  public listProducts: any;  
  
    constructor(public database:SqliteServiceProvider) {
      this.getProducts();
    }
  
    public addProduct(product: Product){
      return this.database.addProduct(product.name,product.type,product.quantity,
        product.price,product.latitude,product.longitude)
        .then(list => {
          return this.getProducts()
            .then(() => {
              return list;
            })
            .catch(err=>console.error("error create product: ", err));
      });
  }

  public updateProduct(product: Product) {
    return this.database.updateProduct(product.id, product.name, product.type, product.quantity,
      product.price, product.latitude, product.longitude)
      .then(list => {
        return this.getProducts()
          .then(() => {
            return list;
          })
          .catch(err => console.error("error create product: ", err));
      });
  }

  public getProducts() {
    return this.database.getProducts()
      .then((data:any) => {
        let listProducts: any = [];
        if (data) {
          for(let item of data) {
            listProducts.push(item);
          }
        }
        this.listProducts = listProducts;
      })
      .catch(err=>console.error("error list of products: ", err));
  }
  
    public getProduct(id: number) {
      return this.database.getProduct(id)
        .then((data:any) => {          
          return data;
        })
        .catch(err=>console.error("error list of products: ", err));
    }
  
  
    public removeProduct(product: any) {
      return this.database.deleteProduct(product.id)
        .then(() => {
          return this.getProducts();
        })
        .catch(err=>console.error("error remove product: ", err));
    }
  }
