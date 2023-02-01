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

  public goToPage(num: number): void {
    if (this.onPageChanged) this.onPageChanged(num);
  }
}
