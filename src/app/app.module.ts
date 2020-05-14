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
import { StreamVideoComponent } from './stream-video/stream-video.component';
import { ClipboardModule } from 'ngx-clipboard';
import { ShowProfileComponent } from './show-profile/show-profile.component';
import { ManageMerchComponent } from './manage-merch/manage-merch.component';
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
    MyfriendsComponent,
    SteamlinkComponent,
    SearchComponent,
    SearchResultComponent,
    CheckoutComponent,
    OrderhistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    NgxPaginationModule,
    UserIdleModule.forRoot({idle: 10, timeout: 20, ping: 120}),
    NgChatModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
