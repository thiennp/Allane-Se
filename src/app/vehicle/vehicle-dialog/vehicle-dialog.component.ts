import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, filter, map, mergeMap, Observable, ReplaySubject, tap } from 'rxjs';

import { BrandDTO, BrandService, ModelDTO } from '../brand.service';
import { VehicleDTO, VehicleService } from '../vehicle.service';


export abstract class VehicleDialogComponent {
  public readonly loading$ = new BehaviorSubject(false);

  private readonly controls: Record<keyof VehicleDTO, AbstractControl> = {
    id: new FormControl<string | null>(null),
    brand: new FormControl<string | null>(null, [Validators.required]),
    model: new FormControl<string | null>(null, [Validators.required]),
    modelYear: new FormControl<number | null>(null, [Validators.required]),
    vin: new FormControl<string | null>(null),
    price: new FormControl<number | null>(null, [Validators.required]),
  };

  public readonly form = new FormGroup(this.controls);
  public readonly brands$: ReplaySubject<BrandDTO[]>;
  public readonly models$: Observable<ModelDTO[]>;
  public readonly modelYears: ReadonlyArray<number> = Array.from(Array(30).keys()).map((i) => new Date().getFullYear() - i);

  protected constructor(
    brandService: BrandService,
    protected readonly vehicleService: VehicleService,
    private readonly matDialogRef: MatDialogRef<VehicleDialogComponent, VehicleDTO>,
    private readonly saveData: (value: VehicleDTO) => Observable<VehicleDTO>,
  ) {
    this.brands$ = brandService.brands$;
    this.models$ = combineLatest([
      this.brands$,
      this.controls.brand.valueChanges,
    ]).pipe(
      map(([brands, brandName]) => brands.find(({ name }) => name === brandName)),
      filter((brand): brand is BrandDTO => !!brand),
      mergeMap(({ id }) => brandService.getModels(id)),
    );

    this.controls.model.disable();
    this.controls.modelYear.disable();

    this.controls.brand.valueChanges.pipe(
      tap(() => this.controls.model.reset()),
      tap(() => this.controls.modelYear.reset()),
      filter((brand) => !!brand),
      tap(() => this.controls.model.enable({ emitEvent: false, onlySelf: true })),
      tap(() => this.controls.modelYear.enable({ emitEvent: false, onlySelf: true })),
    ).subscribe();
  }

  public submit() {
    if (this.form.valid) {
      this.saveData(this.form.value as VehicleDTO).subscribe((data) => this.close(data));
    }
  }

  public close(data?: VehicleDTO) {
    this.matDialogRef.close(data);
  }

  public isError(field: keyof VehicleDTO, validatorKey: string): boolean {
    return !!this.form.get(field)?.errors?.[validatorKey];
  }
}
