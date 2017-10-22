import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { User } from '../../models/user';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionServiceProvider {

  constructor(private nativeStorage: NativeStorage) {
  }

  setUserSession(objUser: User): Promise<any> {
    return this.nativeStorage.setItem('UserSession', objUser);
  }

  getUserSession(): Promise<any> {
    return this.nativeStorage.getItem('myitem');
  }

}
