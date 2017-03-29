
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs';
import {ObservableInput} from 'rxjs/Observable';
import {Customer} from './dataTypes';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  template: require('./edit.page.html')
})
export class EditPage {

  public editCustomerForm: FormGroup;

  private formFields = ['customer', 'siteNick'];
  private customer: Customer;

  constructor(private af: AngularFire,
              private formBuilder: FormBuilder,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.editCustomerForm = this.formBuilder.group({
      customer: '',
      siteNick: ''
    });

    this.editCustomerForm.valueChanges.subscribe(formValues => {
      const updatedCustomer = Object.assign({}, this.customer, formValues);
      this.saveCustomer(updatedCustomer);
    });

    this.activeRoute.params.subscribe(params => {
      this.af.database.list('customers').catch(this.errorHandler).subscribe(customerList => {
        customerList
            .filter(item => item.siteNick === params['siteNick'])
            .map(customer => {
              this.customer = customer;
              this.formFields.forEach(field => {
                const fieldFormControl = <FormControl> this.editCustomerForm.controls[field];
                // Only update if user has not changed the field yet.
                if (fieldFormControl.pristine) {
                  fieldFormControl.setValue(customer[field], {onlySelf: true});
                }
              });
            });
      });
    });
  }

  private saveCustomer(customer: Customer) {
    this.af.database.list('customers')
        .update(this.customer.$key, customer)
        .then(
          success => {
            console.log(success);
            if (this.router) this.router.navigate(['edit', customer.siteNick]);
          },
          error => {
            console.log(error);
            if (this.router) this.router.navigate(['login']);
          });
  }

  private errorHandler(error: any, caught: Observable<any[]>): ObservableInput<any> {
    console.log(error);
    this.router.navigate(['login']);
    return [];
  }

}
