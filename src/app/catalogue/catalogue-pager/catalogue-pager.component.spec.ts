import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguePagerComponent } from './catalogue-pager.component';

describe('CataloguePagerComponent', () => {
  let component: CataloguePagerComponent;
  let fixture: ComponentFixture<CataloguePagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CataloguePagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CataloguePagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
