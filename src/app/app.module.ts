import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CataloguePageComponent } from './catalogue/catalogue-page/catalogue-page.component';
import { CataloguePagerComponent } from './catalogue/catalogue-pager/catalogue-pager.component';
import { CatalogueListComponent } from './catalogue/catalogue-list/catalogue-list.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';
import { ProfilePage } from './profile/profile/profile.page';
import { ProfileCollectionComponent } from './profile/profile-collection/profile-collection.component';
import { ProfileCollectionItemComponent } from './profile/profile-collection-item/profile-collection-item.component';
import { CollectionUpdateButtonComponent } from './components/collection-update-button/collection-update-button.component';


@NgModule({
  declarations: [
    AppComponent,
    CataloguePageComponent,
    CataloguePagerComponent,
    CatalogueListComponent,
    ProfileInfoComponent,
    ProfilePage,
    ProfileCollectionComponent,
    ProfileCollectionItemComponent,
    CollectionUpdateButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
