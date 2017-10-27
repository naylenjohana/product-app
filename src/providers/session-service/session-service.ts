import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { User } from '../../models/user';
import { Events } from 'ionic-angular';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionServiceProvider {

  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(private nativeStorage: NativeStorage, public events: Events) {
  }

  setUserSession(objUser: User): Promise<any> {
    this.login();
    return this.nativeStorage.setItem('UserSession', objUser);
  }

  getUserSession(): Promise<any> {
    return this.nativeStorage.getItem('UserSession');
  }

  hasLoggedIn(): Promise<boolean> {
    return this.nativeStorage.getItem(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    })
    .catch((value)=>{
      return value === false
    });
  };

  login(): void {
    this.nativeStorage.setItem(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login');
  };

  logout(): void {
    this.nativeStorage.remove(this.HAS_LOGGED_IN);
    this.nativeStorage.remove('UserSession')
    this.events.publish('user:logout');
  };

}
