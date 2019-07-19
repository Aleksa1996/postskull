import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendUrl } from './backendUrl';

@Injectable()
export class ReportService {
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get(`${BackendUrl.ReportsUrl}`);
  }

  destroy(id) {
    return this.httpClient.delete(`${BackendUrl.ReportsUrl}/${id}`);
  }
}
