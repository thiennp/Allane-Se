import { BehaviorSubject, filter, fromEvent, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { PageResponseDTO } from './restful-types';


export class LazyLoadingControl<T> {
  public readonly data$ = new BehaviorSubject<PageResponseDTO<T> | null>(null);
  public readonly loading$ = new BehaviorSubject(false);
  public readonly reset$ = new BehaviorSubject(null);
  private readonly page$ = new BehaviorSubject(0);


  constructor(settings: {
    destroy$: Subject<null>;
    parentElm: Subject<HTMLElement>;
    retrieveData: (page: number) => Observable<PageResponseDTO<T>>;
  }) {
    this.page$.subscribe((page) => {
      this.loading$.next(true);

      settings.retrieveData(page).subscribe((data) => {
        const currentOverviewItem = this.data$.value?.overviewItems || [];
        this.data$.next({ ...data, overviewItems: [...currentOverviewItem, ...data.overviewItems] });
        this.loading$.next(false);
      });
    });

    settings.parentElm.pipe(
      switchMap((elm) => fromEvent(elm, 'scroll')),
      takeUntil(settings.destroy$),
      map(({ target }) => target),
      filter((target): target is HTMLElement => target instanceof HTMLElement),
      filter((target) => target.scrollTop + target.offsetHeight > target.scrollHeight - 10),
      filter(() => this.shouldLoadMore()),
      tap(() => this.page$.next(this.page$.value + 1)),
    ).subscribe();
  }

  private shouldLoadMore(): boolean {
    return !!this.data$.value && this.data$.value.numberOfPages > this.page$.value + 1;
  }

  public reset() {
    this.data$.next(null);
    this.page$.next(0);
  }
}
