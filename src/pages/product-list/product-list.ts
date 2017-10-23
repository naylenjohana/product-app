import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import {ProductDetailPage} from "../product-detail/product-detail";


@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public productService: ProductServiceProvider) {      
  }

  public itemSelected(item: any) {
    let productDetailModal = this.modalCtrl.create(ProductDetailPage,{ id: item.id });    
    productDetailModal.onDidDismiss(data => {
      console.log(data);
    });
    productDetailModal.present();    
  }

  public addProductModal() {
    let addProductModal = this.modalCtrl.create(ProductDetailPage, {});
    addProductModal.onDidDismiss(data => {
      console.log(data);
    });
    addProductModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
  }

}
