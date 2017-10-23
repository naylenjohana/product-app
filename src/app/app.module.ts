import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from "@angular/forms";
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from "../pages/perfil/perfil";
import { ChangePassPage } from '../pages/change-pass/change-pass';
import {ProductListPage} from '../pages/product-list/product-list';
import {ProductDetailPage} from '../pages/product-detail/product-detail';
import { RegisterUserPage } from '../pages/register-user/register-user';
import { PerfilDetallePage } from "../pages/perfil-detalle/perfil-detalle";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite} from "@ionic-native/sqlite";
import { Firebase } from '@ionic-native/firebase';
import { SqliteServiceProvider } from '../providers/sqlite-service/sqlite-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { SessionServiceProvider } from '../providers/session-service/session-service';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';

import { firebase } from '../config/enviroment';
import { ProductServiceProvider } from '../providers/product-service/product-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PerfilPage,
    LoginPage,
    RegisterUserPage,
    PerfilDetallePage,
    ChangePassPage,
    ProductListPage,
    ProductDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PerfilPage,
    LoginPage,
    RegisterUserPage,
    PerfilDetallePage,
    ChangePassPage,
    ProductListPage,
    ProductDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    NativeStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SqliteServiceProvider,
    UserServiceProvider,
    SessionServiceProvider,
    FirebaseServiceProvider,
    ProductServiceProvider
  ]
})
export class AppModule { }
