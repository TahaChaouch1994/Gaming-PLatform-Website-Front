import { CoachesDeskComponent } from './coaches-desk/coaches-desk.component';
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
import { StreamVideoComponent } from './stream-video/stream-video.component';
import { BetHomeComponent } from './bet-home/bet-home.component';
import { CoachDetailComponent } from './coach-detail/coach-detail.component';
import { RecruteplayersComponent } from './recruteplayers/recruteplayers.component';
import { BethistoryComponent } from './bethistory/bethistory.component';
import { CoupondetailsComponent } from './coupondetails/coupondetails.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  { path: 'account-registered', component: AccountAddedComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'verifyUser', component: VerifyUserComponent },
  {path: 'requesttournament',component: RequestTournamentComponent},
  {path: 'requesttournamentform',component: RtournamentformComponent},
  {path: 'streamvideo',component: StreamVideoComponent},
  {path: 'ThreadList',component: ListThreadsComponent},
  {path: 'ForumHome',component: ForumHomeComponent},
  {path: 'ThreadDetails',component: ThreadDetailsComponent},
  {path: 'BetHoMe',component: BetHomeComponent},
  {path: 'coach',component: CoachesDeskComponent},
  {path: 'players',component: RecruteplayersComponent},
  {path: 'coachDetail',component: CoachDetailComponent},
  {path: 'bethistory',component: BethistoryComponent},
  {path: 'coupondetails',component: CoupondetailsComponent},
 
  {path: 'ThreadList',component: ListThreadsComponent},
  {path: 'streamvideo',component: StreamVideoComponent},
  { path: 'search', component: SearchResultComponent },
  { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
