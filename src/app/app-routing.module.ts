import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguePageComponent } from './catalogue/catalogue-page/catalogue-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';

const routes: Routes = [
  { path: 'catalogue', component: CataloguePageComponent },
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
