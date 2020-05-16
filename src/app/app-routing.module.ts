import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountAddedComponent } from './account-added/account-added.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestTournamentComponent } from './request-tournament/request-tournament.component';
import { RtournamentformComponent } from './rtournamentform/rtournamentform.component';
import { MytournamentsComponent } from './mytournaments/mytournaments.component';
import { JointournamentComponent } from './jointournament/jointournament.component';
import { CheckmytournamentComponent } from './checkmytournament/checkmytournament.component';
import { GetTournamentByKeyComponent } from './get-tournament-by-key/get-tournament-by-key.component';


const routes: Routes = [
  { path: 'account-registered', component: AccountAddedComponent },
  { path: 'profile', component: ProfileComponent },
  {path: 'requesttournament',component: RequestTournamentComponent},
  {path: 'requesttournamentform',component: RtournamentformComponent},
  {path: 'mytournaments',component: MytournamentsComponent},
  {path:'jointournament',component:JointournamentComponent},
  {path:'checkmytournament',component:CheckmytournamentComponent},
  {path:'gettourbykey',component:GetTournamentByKeyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
