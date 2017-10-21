import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
<<<<<<< HEAD
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Base de Datos
import { SQLite } from "@ionic-native/sqlite";
import { Firebase } from '@ionic-native/firebase';
import { SqliteServiceProvider } from '../providers/sqlite-service/sqlite-service';
=======
import { FormsModule } from "@angular/forms";
>>>>>>> 953f3d15746159fb6eefa1e25df6566978ee6280

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
<<<<<<< HEAD
import { PerfilPage } from "../pages/perfil/perfil";


=======
import { RegisterUserPage } from '../pages/register-user/register-user';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite} from "@ionic-native/sqlite";
import { Firebase } from '@ionic-native/firebase';
import { SqliteServiceProvider } from '../providers/sqlite-service/sqlite-service';
import { UserServiceProvider } from '../providers/user-service/user-service';

>>>>>>> 953f3d15746159fb6eefa1e25df6566978ee6280
@NgModule({
  declarations: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    LoginPage,
    PerfilPage
=======
    ListPage,
    LoginPage,
    RegisterUserPage
>>>>>>> 953f3d15746159fb6eefa1e25df6566978ee6280
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
<<<<<<< HEAD
    LoginPage,
    PerfilPage
=======
    ListPage,
    LoginPage,
    RegisterUserPage
>>>>>>> 953f3d15746159fb6eefa1e25df6566978ee6280
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
<<<<<<< HEAD
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SqliteServiceProvider
=======
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SqliteServiceProvider,
    UserServiceProvider
>>>>>>> 953f3d15746159fb6eefa1e25df6566978ee6280
  ]
})
export class AppModule { }
