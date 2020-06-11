import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
import { MyfriendsComponent } from './myfriends/myfriends.component';
import { SteamlinkComponent } from './steamlink/steamlink.component';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserIdleModule } from 'angular-user-idle';
import { NgChatModule } from 'ng-chat';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { FavorisComponent } from './favoris/favoris.component';
import {  ReactiveFormsModule } from '@angular/forms';

import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import { MysubscriptionComponent } from './mysubscription/mysubscription.component';
import { SubscriptionRequestComponent } from './subscription-request/subscription-request.component';
import {MatCardModule} from '@angular/material/card';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { MyEmojiComponent } from './my-emoji/my-emoji.component';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
import { FileSelectDirective } from 'ng2-file-upload';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { MytournamentsComponent } from './mytournaments/mytournaments.component';
import { JointournamentComponent } from './jointournament/jointournament.component';
import { CheckmytournamentComponent } from './checkmytournament/checkmytournament.component';
import { GetTournamentByKeyComponent } from './get-tournament-by-key/get-tournament-by-key.component';

import { SnackbarComponent } from './snackbar/snackbar.component';
import { KeybetmodalComponent } from './keybetmodal/keybetmodal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IndexComponent } from './index/index.component';

const config: SocketIoConfig = { url: 'http://localhost:1337', options: {} };

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
    CoupondetailsComponent,
    MyfriendsComponent,
    SteamlinkComponent,
    SearchComponent,
    SearchResultComponent,
    CheckoutComponent,
    OrderhistoryComponent,
    MysubscriptionComponent,
    SubscriptionRequestComponent,
    ChatMessageComponent,
    MyEmojiComponent,
    FavorisComponent,
    FileSelectDirective,
    MytournamentsComponent,
    JointournamentComponent,
    CheckmytournamentComponent,
    GetTournamentByKeyComponent,
    SnackbarComponent,
    KeybetmodalComponent,
    IndexComponent
  ],
  imports: [
    MatSnackBarModule,
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
    FormsModule,  
    ReactiveFormsModule,
     HttpClientModule, 
    
  
    NgxPaginationModule,
    UserIdleModule.forRoot({idle: 10, timeout: 20, ping: 120}),
    NgChatModule,
    SocketIoModule.forRoot(config),
    MatDialogModule,
    MatCardModule,
    MatListModule,
    NgxEmojiPickerModule,
    [SweetAlert2Module.forRoot()],
    [SweetAlert2Module],
    [SweetAlert2Module.forChild({ /* option */ })]
  ],
  providers: [],
  entryComponents: [
    ThreadDetailsComponent,
    FavorisComponent,
    SubscriptionRequestComponent,
    KeybetmodalComponent,
    SnackbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
