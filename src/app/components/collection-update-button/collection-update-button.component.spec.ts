import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionUpdateButtonComponent } from './collection-update-button.component';

describe('CollectionUpdateButtonComponent', () => {
  let component: CollectionUpdateButtonComponent;
  let fixture: ComponentFixture<CollectionUpdateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionUpdateButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionUpdateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
