import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let matDialogRef: MatDialogRef<ConfirmationDialogComponent>;

  beforeEach(async () => {
    let matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: {
            title: '',
            content: ''
          }
        },
        { provide: MatDialogRef, useValue: matDialogRef },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
