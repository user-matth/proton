import { AngularFireAuth } from '@angular/fire/compat/auth';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject, Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .catch(error => console.error('Erro ao definir a persistência', error));
    }
  }
}