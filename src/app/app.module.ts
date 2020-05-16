import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountAddedComponent } from './account-added/account-added.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestTournamentComponent } from './request-tournament/request-tournament.component';
import { RtournamentformComponent } from './rtournamentform/rtournamentform.component';
import { MytournamentsComponent } from './mytournaments/mytournaments.component';
import { JointournamentComponent } from './jointournament/jointournament.component';
import { CheckmytournamentComponent } from './checkmytournament/checkmytournament.component';
import { GetTournamentByKeyComponent } from './get-tournament-by-key/get-tournament-by-key.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    AccountAddedComponent,
    ProfileComponent,
    RequestTournamentComponent,
    RtournamentformComponent,
    MytournamentsComponent,
    JointournamentComponent,
    CheckmytournamentComponent,
    GetTournamentByKeyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    [SweetAlert2Module.forRoot()],
    [SweetAlert2Module],
    [SweetAlert2Module.forChild({ /* options */ })]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
