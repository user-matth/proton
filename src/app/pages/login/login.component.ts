import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  continueWithLogin: boolean = false;
  sentEmail: boolean = false;
  email: string = 'mathuscardoso@gmail.com';
  currentStep: number = 1;
  steps: number = 3;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService, 
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const isEmailLink = await this.authService.isSignInWithEmailLink(window.location.href);
      if (isEmailLink) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }
        this.authService.signInWithEmailLink(email!, window.location.href).then((result) => {
          window.localStorage.removeItem('emailForSignIn');
          this.router.navigate(['/home']);
        }).catch((error) => {
          console.error('Erro no login com link de email', error);
        });
      }
    }
  }

  login() {
    this.continueWithLogin = !this.continueWithLogin;
  }

  confirmLogin() {
    this.sentEmail = !this.sentEmail;
  }

  nextStep() {
    if(this.currentStep == 2 && this.email == '') {
      return;
    }
    this.currentStep++;
  }

  previousStep(step?: number) {
    this.currentStep--;
    if(step) {
      this.currentStep = step;
    }
  }

  sendLink() {
    debugger;
    if(this.email != '') {
      this.authService.sendSignInLink(this.email).then(() => {
        window.localStorage.setItem('emailForSignIn', this.email);
        this.currentStep++;
      }).catch(error => {
        console.error('Erro ao enviar link de login', error);
      });
    }
  }

}
