import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguePageComponent } from './catalogue/catalogue-page/catalogue-page.component';
import { AuthGuard } from './guards/access.guard';
import { ProfilePage } from './profile/profile/profile.page';
import { LoginPageComponent } from './login/login-page/login-page.component';

const routes: Routes = [
  {
    path: 'catalogue',
    canActivate: [AuthGuard],
    component: CataloguePageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfilePage,
  },
  {
    path: '**',
    redirectTo: '/catalogue',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
