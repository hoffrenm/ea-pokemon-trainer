import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueListItemComponent } from './catalogue-list-item.component';

describe('CatalogueListItemComponent', () => {
  let component: CatalogueListItemComponent;
  let fixture: ComponentFixture<CatalogueListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogueListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
