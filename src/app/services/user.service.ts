import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendUrl } from './backendUrl';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get(`${BackendUrl.UsersUrl}`);
  }

  create(data) {
    return this.httpClient.post(`${BackendUrl.UsersUrl}`, data);
  }

  find(id: number) {
    return this.httpClient.get(`${BackendUrl.UsersUrl}/${id}`);
  }

  me() {
    return this.httpClient.post(`${BackendUrl.AuthUrl}/me`, {});
  }

  updateUser(id, data) {
    let dataObj = { ...data, _method: 'PUT' };
    if (data instanceof FormData) {
      dataObj = data;
    }

    return this.httpClient.post(`${BackendUrl.UsersUrl}/${id}`, dataObj);
  }

  destroy(id, data) {
    const dataObj = { ...data, _method: 'DELETE' };
    return this.httpClient.post(`${BackendUrl.UsersUrl}/byuser/${id}`, dataObj);
  }

  destroyByAdmin(id) {
    const dataObj = { _method: 'DELETE' };
    return this.httpClient.post(`${BackendUrl.UsersUrl}/${id}`, dataObj);
  }
}
