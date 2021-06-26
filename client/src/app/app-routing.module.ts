import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"", component: PostsListComponent},
  {path:"register", component: RegisterComponent},
  {path:"login", component: LoginComponent}
];
// Todo: decide what should be shown on homescreen(register or random posts)
// Authentication needed as well 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
