
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFire} from 'angularfire2';

@Component({
  selector: 'main-page',
  template: require('./main.page.html')
})
export class MainPage {

  constructor(private af: AngularFire, private router: Router,) {
  }

  logout() {
    this.router.navigate(['/login']);
    this.af.auth.logout();
  }

}
