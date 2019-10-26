import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { MessageComponent } from './components/message/message.component';
import { LearnComponent } from './components/learn/learn.component';
import { PostreadComponent } from './components/postread/postread.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PlansComponent } from './components/plans/plans.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AcademyComponent } from './components/academy/academy.component';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from "./services/auth.service";
import { PostService } from "./services/post.service";
import { AuthGuard } from "./guards/auth.guard";
import { ChatService } from "./services/chat.service";
import { ActiveListComponent } from './components/active-list/active-list.component';

const appRoutes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', component: LearnComponent },
  { path: 'my/register', component: RegisterComponent },
  { path: 'academy', component: LearnComponent },
  { path: 'my/plans', component: PlansComponent },
  { path: ':id', component: PostreadComponent },
  { path: 'academy/:id', component: AcademyComponent },
  { path: 'my/login', component: LoginComponent },
  { path: 'my/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'my/courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'my/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'my/posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'chat', canActivate: [AuthGuard], children: [
    { path: ':chatWith', component: ChatRoomComponent },
    { path: '**', redirectTo: '/chat/chat-room', pathMatch: 'full' }
  ] },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    PostsComponent,
    ChatRoomComponent,
    MessageComponent,
    LearnComponent,
    PostreadComponent,
    SidebarComponent,
    PlansComponent,
    CoursesComponent,
    AcademyComponent,
    ActiveListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule,
    InfiniteScrollModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    AuthService,
    PostService,
    ChatService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
