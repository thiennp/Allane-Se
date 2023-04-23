import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { Observable, Subject } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

import { CreateCustomerDialogComponent } from '../customer-dialog/create-customer-dialog.component';
import { CustomerDialogModule } from '../customer-dialog/customer-dialog.module';
import { EditCustomerDialogComponent } from '../customer-dialog/edit-customer-dialog.component';
import { SelectCustomerDialogComponent } from './select-customer-dialog.component';


describe('SelectCustomerDialogComponent', () => {
  let component: SelectCustomerDialogComponent;
  let fixture: ComponentFixture<SelectCustomerDialogComponent>;
  let matDialogRef: MatDialogRef<SelectCustomerDialogComponent>;
  let matDialog: MatDialog;

  beforeEach(async () => {
    matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [SelectCustomerDialogComponent],
      imports: [
        CommonModule,
        CustomerDialogModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: MatDialog, useValue: matDialog },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
