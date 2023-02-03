import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagerService {
  private allPages: number[] = [1, 2, 3, 4, 5, 6, 7];
  private readonly _currentPage$ = new BehaviorSubject(1);
  private readonly _displayedPages$ = new BehaviorSubject<number[]>([1]);

  public get currentPage$(): Observable<number> {
    return this._currentPage$.asObservable();
  }

  public get displayedPages$(): Observable<number[]> {
    return this._displayedPages$.asObservable();
  }

  public registerPageCount(count: number) {
    this.allPages = Array.from({ length: count }, (_, i) => i + 1);
    this.calculateDisplayed(this._currentPage$.value);
  }

  public onPageChange(page: number) {
    if (page <= 0) return;
    this._currentPage$.next(page);
    this.calculateDisplayed(page);
  }

  // Calculate displayed pages based on the provided page number
  private calculateDisplayed(page: number) {
    const additionalPages = 2;
    const lastPage = this.allPages[this.allPages.length - 1];

    let before: number[] = [];
    let after: number[] = [];

    for (let i = 1; i <= additionalPages; i++) {
      before.push(page - i);
      after.push(page + i);
    }

    const fB = before.filter((it) => Math.sign(it) === 1);
    fB.sort();
    const fA = after.filter((it) => it < lastPage);

    const pagesToDisplay = new Set([1, ...fB, page, ...fA, lastPage]);
    this._displayedPages$.next([...pagesToDisplay]);
  }
}
