import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostCardComponent } from './posts/post-card/post-card.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ModalModule } from './_modal';

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
    ProfileEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxDropzoneModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    ModalModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
