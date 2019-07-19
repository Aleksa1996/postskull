import { isDevMode } from '@angular/core';
export class BackendUrl {
  public static get baseUrl() {
    return isDevMode() ? 'http://localhost/postSkull/public/api' : '/api';
  }

  public static get AuthUrl(): string {
    return `${BackendUrl.baseUrl}/auth`;
  }
  public static get UsersUrl(): string {
    return `${BackendUrl.baseUrl}/users`;
  }
  public static get SectionsUrl(): string {
    return `${BackendUrl.baseUrl}/sections`;
  }
  public static get ReportsUrl(): string {
    return `${BackendUrl.baseUrl}/reports`;
  }
  public static get NotificationsUrl(): string {
    return `${BackendUrl.baseUrl}/notifications`;
  }
  public static get PostsUrl(): string {
    return `${BackendUrl.baseUrl}/posts`;
  }
  public static get CommentsUrl(): string {
    return `${BackendUrl.baseUrl}/comments`;
  }
  public static get RolesUrl(): string {
    return `${BackendUrl.baseUrl}/roles`;
  }
}
