import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { MembersComponent } from './components/pages/members/members.component';
import { NewsComponent } from './components/pages/news/news.component';
import { AboutComponent } from './components/pages/about/about.component';
import { UnknownComponent } from './components/pages/unknown/unknown.component';
import { MemberListComponent } from './components/partials/member-list/member-list.component';
import { MemberDetailComponent } from './components/partials/member-list/member-detail/member-detail.component';
import { LineupsListComponent } from './components/partials/lineups-list/lineups-list.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { NewsListComponent } from './components/partials/news-list/news-list.component';
import { NewsDetailComponent } from './components/partials/news-list/news-detail/news-detail.component';
import { NewsViewComponent } from './components/partials/news-view/news-view.component';
import { PageNavigatorComponent } from './components/partials/page-navigator/page-navigator.component';
import { MarkdownModule } from 'ngx-markdown';
import { AdminComponent } from './components/pages/admin/admin.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminSideMenuComponent } from './components/partials/admin-side-menu/admin-side-menu.component';
import { AdminLogoutComponent } from './components/partials/admin/admin-logout/admin-logout.component';
import { AdminAdminsComponent } from './components/partials/admin/admin-admins/admin-admins.component';
import { AdminNewsComponent } from './components/partials/admin/admin-news/admin-news.component';
import { AdminMembersComponent } from './components/partials/admin/admin-members/admin-members.component';
import { AdminSocialsComponent } from './components/partials/admin/admin-socials/admin-socials.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MembersComponent,
    NewsComponent,
    AboutComponent,
    UnknownComponent,
    MemberListComponent,
    MemberDetailComponent,
    LineupsListComponent,
    LoadingComponent,
    NewsListComponent,
    NewsDetailComponent,
    NewsViewComponent,
    PageNavigatorComponent,
    AdminComponent,
    LoginComponent,
    AdminSideMenuComponent,
    AdminLogoutComponent,
    AdminAdminsComponent,
    AdminNewsComponent,
    AdminMembersComponent,
    AdminSocialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      newestOnTop: true
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
