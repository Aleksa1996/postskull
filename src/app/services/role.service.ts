import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendUrl } from './backendUrl';

@Injectable()
export class RoleService {
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get(`${BackendUrl.RolesUrl}`);
  }
}
