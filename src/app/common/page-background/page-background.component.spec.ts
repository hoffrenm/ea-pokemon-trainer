import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBackgroundComponent } from './page-background.component';

describe('PageBackgroundComponent', () => {
  let component: PageBackgroundComponent;
  let fixture: ComponentFixture<PageBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageBackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
