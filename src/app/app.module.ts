import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CataloguePageComponent } from './catalogue/catalogue-page/catalogue-page.component';
import { CataloguePagerComponent } from './catalogue/catalogue-pager/catalogue-pager.component';
import { CatalogueListComponent } from './catalogue/catalogue-list/catalogue-list.component';
import { PokemonService } from './services/pokemon.service';
import { CatalogueListItemComponent } from './catalogue/catalogue-list-item/catalogue-list-item.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { LoginService } from './services/login.service';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CataloguePageComponent,
    CataloguePagerComponent,
    CatalogueListComponent,
    CatalogueListItemComponent,
    LoginPageComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PokemonService,
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
