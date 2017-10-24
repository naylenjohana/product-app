
import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductServiceProvider } from "../../providers/product-service/product-service";
import { Product } from '../../models/product';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  myForm: FormGroup;
  public product: Product;
  // public id: number;
  //public name: string;

  constructor(public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    private productServiceProvider: ProductServiceProvider,
    public nav: NavParams) {

    this.product = new Product();
    this.product.id = parseInt(nav.get('id'));
    console.log(this.product.id);
    if (this.product.id) {
      this.getProduct();
    }
    //console.log(this.id);
    //this.name = nav.get('name');
    this.myForm = this.createForm();
  }

  private createForm() {
    return this.formBuilder.group({
      id: [this.product.id],
      name: [this.product.name, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      type: [this.product.type],
      quantity: [this.product.quantity],
      price: [this.product.price],
      latitude: [this.product.latitude],
      longitude: [this.product.longitude]
    });
  }

  public getProduct() {
    console.log('this is ' + this.product.id)
    this.productServiceProvider.getProduct(this.product.id)
      .then(result => {
        this.product = result;
        console.log(result);
      })
      .catch(err => console.error("error get product: ", err));
  }

  public saveForm() {
    if (!this.product.id) {
      this.productServiceProvider.addProduct(this.myForm.value)
        .then(result => {
          console.debug(result);
          this.dismiss();
        })
        .catch(err => console.error("error create product: ", err));
    }
    else {
      this.productServiceProvider.updateProduct(this.myForm.value)
        .then(result => {
          console.debug(result);
          this.dismiss();
        })
        .catch(err => console.error("error create product: ", err));
    }
  }

  public dismiss() {
    let data = {};
    this.viewCtrl.dismiss(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }
}

