
import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductServiceProvider} from "../../providers/product-service/product-service";
import{Product} from '../../models/product';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  myForm: FormGroup;
  public product:Product;
  public title:string;
  public editando:boolean=false;

  constructor(public viewCtrl: ViewController,
              public formBuilder: FormBuilder,
              private productServiceProvider :ProductServiceProvider,
              public nav: NavParams,public alertctrl: AlertController) {

    this.product=new Product();
    this.product.id =parseInt(nav.get('id'));
    if(this.product.id)this.editando=true;
    if(this.editando)
    {
      this.getProduct();   
      this.title='Editar Producto';
    }
    else
    {
      this.title='Crear Producto';
    }
    
    this.myForm = this.createForm();    
  }

  private createForm() {
    return this.formBuilder.group({
      id: [this.product.id],
      name: [this.product.name, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      type:[this.product.type, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
      quantity:[this.product.quantity, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(10)])],
      price:[this.product.price,Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      latitude:[this.product.latitude,Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
      longitude:[this.product.longitude,Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])]
    });
  }

  public getProduct()
  {    
    this.productServiceProvider.getProduct(this.product.id)
    .then(result => {
      this.product=result;
      this.myForm = this.createForm();
    })
    .catch(err=>console.error("error get product: ", err));
  }

  DeleteProductdb()
  {
    this.productServiceProvider.removeProduct(this.product)
    .then(result => {
     console.log('Se eliminio el producto correctamente');
    })
    .catch(err=>console.error("error get product: ", err));
  }
  

  DeleteProduct() {
    console.log(this.editando);
    let confirm = this.alertctrl.create({
      title: 'Eliminar Producto',
      message: '¿Está seguro que desea eliminar el producto?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.DeleteProductdb();
            this.dismiss();
          }
        }]
    });
    confirm.present();
  }

  public saveForm() {
    
    let message:string;
    let title:string;
    if(!this.editando)
    {
      message='¿Está seguro que desea crear el producto?';
      title='Crear producto';
    
    }
    else
    {
      message='¿Está seguro que desea editar el producto?';
      title='Editar producto';      
    }
    let confirm = this.alertctrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: () => {
            if(this.editando)
            {
                this.updateProduct();
            }
            else
            {
              this.addProduct();
            }
            
            this.dismiss();
          }
        }]
    });
    confirm.present();
  }

  addProduct()
  {
    console.log('add');
    console.log(this.myForm.value)
    this.productServiceProvider.addProduct(this.myForm.value)
    .then(result => {
      console.debug(result);
      this.dismiss();
    })
    .catch(err=>console.error("error create product: ", err));
  }
  updateProduct()
  {
    this.productServiceProvider.updateProduct(this.myForm.value)
    .then(result => {
      console.debug(result);
      this.dismiss();
    })
    .catch(err=>console.error("error create product: ", err));

  }

  public dismiss() {
    let data = {};
    this.viewCtrl.dismiss(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }
}

