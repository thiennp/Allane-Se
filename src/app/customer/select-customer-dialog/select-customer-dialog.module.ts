import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';

import { CustomerDialogModule } from '../customer-dialog/customer-dialog.module';
import { SelectCustomerDialogComponent } from './select-customer-dialog.component';



@NgModule({
  declarations: [
    SelectCustomerDialogComponent
  ],
  imports: [
    CommonModule,
    CustomerDialogModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
})
export class SelectCustomerDialogModule { }
