import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:username', component: ProfileDetailComponent },
  {
    path: 'create-post',
    component: PostCreateComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard], // can only access if authenticated
  },
  {
    path: 'edit-profile',
    component: ProfileEditComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard], // can only access if authenticated
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
