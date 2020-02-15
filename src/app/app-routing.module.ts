import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountAddedComponent } from './account-added/account-added.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: 'account-registered', component: AccountAddedComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
