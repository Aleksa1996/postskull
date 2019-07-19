import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { SignupComponent } from '../components/auth/signup/signup.component';
import { ProfileComponent } from '../components/auth/profile/profile.component';
import { SettingsComponent } from '../components/auth/profile/settings/settings.component';
import { PostDetailComponent } from '../components/posts/post-detail/post-detail.component';
import { PostNewFormComponent } from '../components/posts/post-new-form/post-new-form.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { SectionEditFormComponent } from '../admin-panel/sections/section-edit-form/section-edit-form.component';
import { UserEditFormComponent } from '../admin-panel/users/user-edit-form/user-edit-form.component';
import { UserComponent } from '../components/user/user.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { NotAuthGuardService } from '../services/not-auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuardService] },
  { path: 'signup', component: SignupComponent, canActivate: [NotAuthGuardService] },
  { path: 'new', component: PostNewFormComponent, canActivate: [AuthGuardService] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'profile/settings', component: SettingsComponent, canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuardService] },
  { path: 'admin/section/new', component: SectionEditFormComponent, canActivate: [AuthGuardService] },
  { path: 'admin/section/:id', component: SectionEditFormComponent, canActivate: [AuthGuardService] },
  { path: 'admin/user/new', component: UserEditFormComponent, canActivate: [AuthGuardService] },
  { path: 'admin/user/:id', component: UserEditFormComponent, canActivate: [AuthGuardService] },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
