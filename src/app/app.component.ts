import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from "../pages/perfil/perfil";
import { RegisterUserPage } from "../pages/register-user/register-user";

//interface
import { PageInterface } from "../models/pages";

//services
import { SessionServiceProvider } from "../providers/session-service/session-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  loggedInPages: PageInterface[] = [
    { title: 'Productos', name: 'HomePage', component: HomePage, icon: 'list-box' },
    { title: 'Perfil', name: 'PerfilPage', component: PerfilPage, icon: 'person' },
    { title: 'Cerrar Sesión', name: 'LoginPage', component: LoginPage, icon: 'log-out', logsOut: true }
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Iniciar Sesión', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Regístrate', name: 'RegisterUserPage', component: RegisterUserPage, icon: 'person-add' }
  ];

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menu: MenuController,
    public events: Events,
    public userData: SessionServiceProvider,
    public alertctrl: AlertController) {

    this.initializeApp();

    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
      if (hasLoggedIn)
        this.rootPage = HomePage;
      else
        this.rootPage = LoginPage;
    });
    this.enableMenu(true);

    this.listenToLoginEvents();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.logsOut === true) {

      let confirm = this.alertctrl.create({
        title: '¡Cerrar sesión!',
        message: 'Esta seguro que quiere cerrar la sesión?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              console.log('Cancelar cierre sesión');
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.userData.logout();
              this.nav.setRoot(page.component)
                .catch((err: any) => {
                  console.log(`Error al generar Root: ${err}`);
                });
            }
          }
        ]
      });
      confirm.present();
    } else {
      this.nav.setRoot(page.component)
        .catch((err: any) => {
          console.log(`Error al generar Root: ${err}`);
        });
    }
  }

  isActive(page) {

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');

  }

}
