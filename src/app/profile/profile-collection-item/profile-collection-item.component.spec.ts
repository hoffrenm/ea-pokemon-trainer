import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCollectionItemComponent } from './profile-collection-item.component';

describe('ProfileCollectionItemComponent', () => {
  let component: ProfileCollectionItemComponent;
  let fixture: ComponentFixture<ProfileCollectionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCollectionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCollectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
