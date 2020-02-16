import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountAddedComponent } from './account-added/account-added.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestTournamentComponent } from './request-tournament/request-tournament.component';
import { RtournamentformComponent } from './rtournamentform/rtournamentform.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { ThreadDetailsComponent } from './thread-details/thread-details.component';
import { ListThreadsComponent } from './list-threads/list-threads.component';


const routes: Routes = [
  { path: 'account-registered', component: AccountAddedComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'verifyUser', component: VerifyUserComponent },
  {path: 'requesttournament',component: RequestTournamentComponent},
  {path: 'requesttournamentform',component: RtournamentformComponent},
  {path: 'ForumHome',component: ForumHomeComponent},
  {path: 'ThreadDetails',component: ThreadDetailsComponent},
  {path: 'ThreadList',component: ListThreadsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
