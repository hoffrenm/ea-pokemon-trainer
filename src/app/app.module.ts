import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { PokemonService } from './services/pokemon.service';
import { CatalogueListItemComponent } from './catalogue/catalogue-list-item/catalogue-list-item.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { LoginService } from './services/login.service';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { PageBackgroundComponent } from './common/page-background/page-background.component';
import { PageWrapperComponent } from './common/page-wrapper/page-wrapper.component';
import { PageNavbarComponent } from './common/page-navbar/page-navbar.component';
import { DetailsPageComponent } from './details/details-page/details-page.component';
import { DetailsCardComponent } from './details/details-card/details-card.component';

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
    CatalogueListItemComponent,
    PageBackgroundComponent,
    PageWrapperComponent,
    PageNavbarComponent,
    LoginPageComponent,
    LoginFormComponent,
    DetailsPageComponent,
    DetailsCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [PokemonService, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
