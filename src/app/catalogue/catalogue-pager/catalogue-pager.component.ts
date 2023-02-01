import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catalogue-pager',
  templateUrl: './catalogue-pager.component.html',
  styleUrls: ['./catalogue-pager.component.css'],
})
export class CataloguePagerComponent {
  @Input() pages?: number[];
  @Input() currentPage?: number;
  @Input() onPageChanged?: (page: number) => void;

  public onNextClick(): void {
    if (this.onPageChanged && this.currentPage)
      this.onPageChanged(this.currentPage + 1);
  }

  public onPreviousClick(): void {
    if (this.onPageChanged && this.currentPage)
      this.onPageChanged(this.currentPage - 1);
  }

  public shouldRenderFirstDots(page: number): boolean {
    return this.pages?.indexOf(page) === 1 && page !== 2;
  }

  public shouldRenderLastDots(page: number): boolean {
    const secondToLast = (this.pages?.at(this.pages?.length - 1) ?? 0) - 1;
    const pageIndex = this.pages?.indexOf(page);
    const secondToLastPageIndex = (this.pages?.length ?? 0) - 2;
    return pageIndex === secondToLastPageIndex && page !== secondToLast;
  }

  public goToPage(num: number): void {
    if (this.onPageChanged) this.onPageChanged(num);
  }
}
