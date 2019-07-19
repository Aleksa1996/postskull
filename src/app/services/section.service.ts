import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BackendUrl } from './backendUrl';
import { Section } from '../shared/Section';
import { Subject } from 'rxjs';

@Injectable()
export class SectionService {
  public sectionsChanged = new Subject();

  constructor(private httpClient: HttpClient, private router: Router) {}

  all() {
    return this.httpClient.get<Section[]>(BackendUrl.SectionsUrl);
  }

  find(id) {
    return this.httpClient.get<Section>(`${BackendUrl.SectionsUrl}/${id}`);
  }

  create(data) {
    return this.httpClient.post(BackendUrl.SectionsUrl, data);
  }

  update(id, data) {
    const dataObj = { ...data, _method: 'PUT' };
    return this.httpClient.post(`${BackendUrl.SectionsUrl}/${id}`, dataObj);
  }

  destroy(id) {
    return this.httpClient.delete(`${BackendUrl.SectionsUrl}/${id}`);
  }
}
