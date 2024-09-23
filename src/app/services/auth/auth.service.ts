import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../../../environments/environment';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host: string = environment.host;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }

  sendSignInLink(email: string): Promise<void> {
    const actionCodeSettings = {
      url: 'http://localhost:4200/home',
      handleCodeInApp: true,
    };
    return this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings);
  }  

  isSignInWithEmailLink(url: string): Promise<boolean> {
    return this.afAuth.isSignInWithEmailLink(url);
  }

  signInWithEmailLink(email: string, url: string): Promise<any> {
    return this.afAuth.signInWithEmailLink(email, url);
  }

  getAuthState() {
    return this.afAuth.authState;
  }
}
