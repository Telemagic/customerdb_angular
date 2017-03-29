
import {Router} from '@angular/router';
import {Component, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Customer} from './dataTypes';
import {ObservableInput} from 'rxjs/Observable';
import {AngularFire} from 'angularfire2';

@Component({
  template: require('./overview.page.html')
})
export class OverviewPage {

  customerList: Observable<Customer[]>;
  searchFilter: string;

  constructor(private af: AngularFire, private router: Router) {
    this.customerList = af.database.list('customers').catch(this.errorHandler)
  }

  editCustomer(customer: Customer) {
    this.router.navigate(['edit', customer.siteNick]);
  }

  private errorHandler(error: any, caught: Observable<any[]>): ObservableInput<any> {
    console.log(error);
    this.router.navigate(['login']);
    return [];
  }

}
