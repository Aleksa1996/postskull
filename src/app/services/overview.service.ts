import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendUrl } from './backendUrl';
import { Post } from '../shared/Post';

@Injectable()
export class OverviewService {
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get(`${BackendUrl.UsersUrl}/overview`);
  }

  allWithFilter(filter) {
    return this.httpClient.get(`${BackendUrl.UsersUrl}/overview?filter=${filter}`);
  }
}
