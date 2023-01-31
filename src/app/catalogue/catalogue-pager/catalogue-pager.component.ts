import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogue-pager',
  templateUrl: './catalogue-pager.component.html',
  styleUrls: ['./catalogue-pager.component.css'],
})
export class CataloguePagerComponent {
  public currentPage: number = 1;
  public pages: number[] = [1, 2, 3, 4, 5, 6, 7];

  public onNextClick(): void {
    this.currentPage++;
  }

  public onPreviousClick(): void {
    this.currentPage--;
  }
}
