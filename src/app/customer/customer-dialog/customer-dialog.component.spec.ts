import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { CustomerDialogComponent } from './customer-dialog.component';


@Component({
  template: '',
})
export class TestCustomerDialogComponent extends CustomerDialogComponent {
  constructor(
    matDialogRef: MatDialogRef<TestCustomerDialogComponent>,
  ) {
    super(matDialogRef, (value) => of(value.id));
  }
}


describe('CustomerDialogComponent', () => {
  let component: TestCustomerDialogComponent;
  let fixture: ComponentFixture<TestCustomerDialogComponent>;
  let matDialogRef: MatDialogRef<TestCustomerDialogComponent>;

  beforeEach(async () => {
    matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [TestCustomerDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    it('should close the dialog with data from saveData response promise', () => {
      const id = Math.floor(Math.random() * 1000000);
      component.form.setValue({
        id,
        firstName: 'Whoopi',
        lastName: 'Phillips',
        birthDate: '1980-10-10',
      });

      component.submit();
      expect(matDialogRef.close).toHaveBeenCalledWith(id);
    });

    it('should not close the dialog when the form is error', () => {
      component.form.patchValue({
        firstName: 'Carissa',
        lastName: 'Wiley',
      });

      component.submit();
      expect(matDialogRef.close).not.toHaveBeenCalled();


      component.form.reset();
      component.form.patchValue({
        lastName: 'Wiley',
        birthDate: '1980-10-10',
      });

      component.submit();
      expect(matDialogRef.close).not.toHaveBeenCalled();


      component.form.reset();
      component.form.patchValue({
        firstName: 'Carissa',
        birthDate: '1980-10-10',
      });

      component.submit();
      expect(matDialogRef.close).not.toHaveBeenCalled();
    });
  });
});
