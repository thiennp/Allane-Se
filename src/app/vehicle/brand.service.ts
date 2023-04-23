import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, iif, mergeMap, Observable, of, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export type BrandDTO = {
  id: number;
  name: string;
};

export type ModelDTO = {
  id: number;
  name: string;
  brandId: number;
};


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  public readonly brands$ = new ReplaySubject<BrandDTO[]>(1);
  public readonly models$ = new ReplaySubject<Record<string, ModelDTO[]>>(1);
  public readonly preloaded$ = new BehaviorSubject<Record<string, boolean>>({});

  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.httpClient.get<BrandDTO[]>(`${environment.apiUrl}/brands`).subscribe((brands) => this.brands$.next(brands));
    this.models$.next({});
  }

  public getModels(brandId: number): Observable<ModelDTO[]> {
    return this.models$.pipe(
      mergeMap((models) => iif(
        () => !!models[brandId],
        of(models[brandId]),
        this.preloaded$.pipe(
          first((preloaded) => !preloaded[brandId]),
          tap((preloaded) => this.preloaded$.next({ ...preloaded, [brandId]: true })),
          mergeMap(() => this.httpClient.get<ModelDTO[]>(`${environment.apiUrl}/brand/${brandId}/models`).pipe(
            tap((brandModels) => this.models$.next({ ...models, [brandId]: brandModels })),
          )),
        ),
      )),
    );
  }
}
