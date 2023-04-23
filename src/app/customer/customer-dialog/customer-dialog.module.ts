import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
} from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from 'src/environments/environment';

import { CreateCustomerDialogComponent } from './create-customer-dialog.component';
import { EditCustomerDialogComponent } from './edit-customer-dialog.component';


@NgModule({
  declarations: [
    CreateCustomerDialogComponent,
    EditCustomerDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } },
    { provide: MAT_MOMENT_DATE_FORMATS, useValue: environment.defaultDateFormat },
  ]
})
export class CustomerDialogModule { }
