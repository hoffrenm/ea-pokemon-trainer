import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguePageComponent } from './catalogue/catalogue-page/catalogue-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfilePage } from './profile/profile/profile.page';


const routes: Routes = [
  { path: 'catalogue', component: CataloguePageComponent },
  { path: 'profile', component: ProfilePage, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
