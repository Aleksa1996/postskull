import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoutingModule } from './routing/routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SideNavComponent } from './components/layout/side-nav/side-nav.component';

import { HomeComponent } from './components/home/home.component';

import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/posts/post-detail/post-detail.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { PostItemComponent } from './components/posts/post-list/post-item/post-item.component';

import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

import { ProfileComponent } from './components/auth/profile/profile.component';
import { SettingsComponent } from './components/auth/profile/settings/settings.component';
import { AccountFormComponent } from './components/auth/profile/settings/account-form/account-form.component';
import { PasswordFormComponent } from './components/auth/profile/settings/password-form/password-form.component';
import { ProfileFormComponent } from './components/auth/profile/settings/profile-form/profile-form.component';
import { OverviewComponent } from './components/auth/profile/overview/overview.component';
import { CommentsComponent } from './components/posts/comments/comments.component';
import { CommentComponent } from './components/posts/comments/comment/comment.component';
import { CommentFormComponent } from './components/posts/comments/comment-form/comment-form.component';
import { PostReportFormComponent } from './components/posts/post-detail/post-report-form/post-report-form.component';
import { PostNewFormComponent } from './components/posts/post-new-form/post-new-form.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SectionsComponent } from './admin-panel/sections/sections.component';
import { UsersComponent } from './admin-panel/users/users.component';
import { ReportsComponent } from './admin-panel/reports/reports.component';
import { SectionEditFormComponent } from './admin-panel/sections/section-edit-form/section-edit-form.component';
import { UserEditFormComponent } from './admin-panel/users/user-edit-form/user-edit-form.component';
import { UserComponent } from './components/user/user.component';
import { NotificationsComponent } from './components/auth/profile/notifications/notifications.component';
import { PostDeleteModalComponent } from './components/posts/post-detail/post-delete-modal/post-delete-modal.component';
import { PostEditModalComponent } from './components/posts/post-detail/post-edit-modal/post-edit-modal.component';
import { CommentDeleteModalComponent } from './components/posts/comments/comment-delete-modal/comment-delete-modal.component';
import { CommentEditModalComponent } from './components/posts/comments/comment-edit-modal/comment-edit-modal.component';
import { FormErrorComponent } from './components/form-error/form-error.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SectionService } from './services/section.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NotAuthGuardService } from './services/not-auth-guard.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { CommentService } from './services/comment.service';
import { NotificationService } from './services/notification.service';
import { OverviewService } from './services/overview.service';
import { RoleService } from './services/role.service';
import { ReportService } from './services/report.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    HomeComponent,
    PostsComponent,
    PostDetailComponent,
    PostListComponent,
    PostItemComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    SettingsComponent,
    AccountFormComponent,
    PasswordFormComponent,
    ProfileFormComponent,
    OverviewComponent,
    CommentsComponent,
    CommentComponent,
    CommentFormComponent,
    PostReportFormComponent,
    PostNewFormComponent,
    AdminPanelComponent,
    SectionsComponent,
    UsersComponent,
    ReportsComponent,
    SectionEditFormComponent,
    UserEditFormComponent,
    UserComponent,
    NotificationsComponent,
    PostDeleteModalComponent,
    PostEditModalComponent,
    CommentDeleteModalComponent,
    CommentEditModalComponent,
    FormErrorComponent,
    NotfoundComponent
  ],
  imports: [BrowserModule, RoutingModule, NgbModule.forRoot(), FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    AuthService,
    AuthGuardService,
    NotAuthGuardService,
    SectionService,
    PostService,
    UserService,
    CommentService,
    NotificationService,
    OverviewService,
    RoleService,
    ReportService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PostReportFormComponent,
    PostDeleteModalComponent,
    PostEditModalComponent,
    CommentDeleteModalComponent,
    CommentEditModalComponent
  ]
})
export class AppModule {}
