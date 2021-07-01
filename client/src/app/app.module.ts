import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostCardComponent } from './posts/post-card/post-card.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HamburgerComponent,
    LoginComponent,
    RegisterComponent,
    PostsListComponent,
    PostCardComponent,
    ProfileDetailComponent,
    PostCreateComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
