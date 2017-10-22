import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from "@angular/forms";
import { NativeStorage } from '@ionic-native/native-storage';

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from "../pages/perfil/perfil";
import { ChangePassPage } from '../pages/change-pass/change-pass';


import { RegisterUserPage } from '../pages/register-user/register-user';
import { PerfilDetallePage } from "../pages/perfil-detalle/perfil-detalle";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite} from "@ionic-native/sqlite";
import { Firebase } from '@ionic-native/firebase';
import { SqliteServiceProvider } from '../providers/sqlite-service/sqlite-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { SessionServiceProvider } from '../providers/session-service/session-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PerfilPage,
    LoginPage,
    RegisterUserPage,
    PerfilDetallePage,
    ChangePassPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
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
    ChangePassPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    NativeStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SqliteServiceProvider,
    UserServiceProvider,
    SessionServiceProvider
  ]
})
export class AppModule { }
