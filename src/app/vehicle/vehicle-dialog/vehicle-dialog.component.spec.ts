import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';

import { BrandDTO, BrandService } from '../brand.service';
import { VehicleDialogComponent } from './vehicle-dialog.component';


@Component({
  template: '',
})
export class TestVehicleDialogComponent extends VehicleDialogComponent {
  constructor(
    brandService: BrandService,
    matDialogRef: MatDialogRef<TestVehicleDialogComponent>,
  ) {
    super(brandService, matDialogRef, (value) => of(value.id));
  }
}


describe('VehicleDialogComponent', () => {
  let component: TestVehicleDialogComponent;
  let fixture: ComponentFixture<TestVehicleDialogComponent>;
  let brands$: Subject<BrandDTO[]>;
  let matDialogRef: MatDialogRef<TestVehicleDialogComponent>;

  beforeEach(async () => {
    brands$ = new Subject<BrandDTO[]>();
    matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [TestVehicleDialogComponent],
      providers: [
        {
          provide: BrandService, useValue: {
            brands$,
            getModels(id: number) {
              return [[{ id: 1, name: 'X1' }], [{ id: 2, name: 'CLA180' }]][id];
            },
          }
        },
        { provide: MatDialogRef, useValue: matDialogRef },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset model and modelYear when brand is updated', () => {
    component.form.patchValue({
      model: 'X1',
      modelYear: 2023,
    });

    expect(component.form.get('model')?.value).toEqual('X1');

    component.form.patchValue({
      brand: 'Mercedes',
    });

    expect(component.form.get('model')?.value).toEqual(null);
    expect(component.form.get('modelYear')?.value).toEqual(null);
  });

  describe('submit', () => {
    it('should close the dialog with data from saveData response promise', () => {
      const id = Math.floor(Math.random() * 1000000);
      component.form.setValue({
        id,
        brand: 'BMW',
        model: 'X1',
        modelYear: 2023,
        vin: null,
        price: 50000,
      });

      component.submit();
      expect(matDialogRef.close).toHaveBeenCalledWith(id);
    });

    it('should not close the dialog when the form is error', () => {
      component.form.patchValue({
        model: 'X1',
        modelYear: 2023,
        vin: null,
        price: 50000,
      });

      component.submit();
      expect(matDialogRef.close).not.toHaveBeenCalled();
    });
  });
});
