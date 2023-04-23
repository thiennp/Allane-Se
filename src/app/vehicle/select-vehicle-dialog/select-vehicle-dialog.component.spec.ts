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

import { VehicleDialogModule } from '../vehicle-dialog/vehicle-dialog.module';
import { SelectVehicleDialogComponent } from './select-vehicle-dialog.component';

describe('SelectVehicleDialogComponent', () => {
  let component: SelectVehicleDialogComponent;
  let fixture: ComponentFixture<SelectVehicleDialogComponent>;
  let matDialogRef: MatDialogRef<SelectVehicleDialogComponent>;
  let matDialog: MatDialog;

  beforeEach(async () => {
    matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [SelectVehicleDialogComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        ReactiveFormsModule,
        VehicleDialogModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: MatDialog, useValue: matDialog },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
