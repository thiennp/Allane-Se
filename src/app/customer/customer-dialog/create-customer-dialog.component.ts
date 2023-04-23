import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';

import { CustomerService, ResponseCustomerDTO } from '../customer.service';
import { CustomerDialogComponent } from './customer-dialog.component';

@Component({
  templateUrl: './customer-dialog.component.html',
})
export class CreateCustomerDialogComponent extends CustomerDialogComponent {

  constructor(
    customerService: CustomerService,
    matDialogRef: MatDialogRef<CustomerDialogComponent, number>,
  ) {
    super(matDialogRef, (value) => customerService.create(value).pipe(
      map(({ id }) => id),
    ));
  }
}
