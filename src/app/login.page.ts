
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {EmailPasswordCredentials} from 'angularfire2/auth';
import {AngularFire} from 'angularfire2';

@Component({
  template: require('./login.page.html')
})
export class LoginPage {

  credentials: EmailPasswordCredentials = {
    email: '',
    password: ''
  };

  loginError = false;

  constructor(private af: AngularFire, private router: Router) {
  }

  login() {
    this.af.auth.login(this.credentials)
      .then(success => {
        this.router.navigate(['/overview']);
        this.loginError = false;
      })
      .catch(error => {
        console.log(error);
        this.credentials.password = '';
        this.loginError = true;
      });
  }

}
