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
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { ListThreadsComponent } from './list-threads/list-threads.component';
import { ThreadDetailsComponent } from './thread-details/thread-details.component';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { StreamVideoComponent } from './stream-video/stream-video.component';
import { ClipboardModule } from 'ngx-clipboard';
import { ShowProfileComponent } from './show-profile/show-profile.component';
import { ManageMerchComponent } from './manage-merch/manage-merch.component';
import { BetHomeComponent } from './bet-home/bet-home.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CoachesDeskComponent } from './coaches-desk/coaches-desk.component';
import { CoachDetailComponent } from './coach-detail/coach-detail.component';
import { RecruteplayersComponent } from './recruteplayers/recruteplayers.component';
import { BethistoryComponent } from './bethistory/bethistory.component';
import { CoupondetailsComponent } from './coupondetails/coupondetails.component';


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
    VerifyUserComponent,
    ForumHomeComponent,
    ListThreadsComponent,
    ThreadDetailsComponent,
    StreamVideoComponent,
    ShowProfileComponent,
    ManageMerchComponent,
    BetHomeComponent,
    CoachesDeskComponent,
    CoachDetailComponent,
    RecruteplayersComponent,
    BethistoryComponent,
    CoupondetailsComponent
  ],
  imports: [
    CarouselModule, WavesModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
    BrowserAnimationsModule,
    ClipboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
