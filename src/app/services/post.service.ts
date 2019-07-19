import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Paginated } from '../shared/Paginated';
import { Post } from '../shared/Post';
import { BackendUrl } from './backendUrl';
import { Subject } from 'rxjs';

import { objToQueryString } from '../shared/Helpers';

@Injectable()
export class PostService {
  public fetchedPosts = new Subject();
  public fetchedPost = new Subject();
  constructor(private httpClient: HttpClient) {}

  all(url: string = `${BackendUrl.PostsUrl}?page=1`, query: any = {}) {
    if (url == null) url = `${BackendUrl.PostsUrl}?page=1`;
    this.httpClient.get<Paginated<Post>>(`${url}&${objToQueryString(query)}`).subscribe((posts: Paginated<Post>) => {
      this.fetchedPosts.next(posts);
    });
  }

  find(id: number) {
    return this.httpClient.get<Post>(`${BackendUrl.PostsUrl}/${id}`).subscribe((post: Post) => {
      this.fetchedPost.next(post);
    });
  }

  like(id: number) {
    return this.httpClient.post(`${BackendUrl.PostsUrl}/${id}/like`, {});
  }

  unlike(id: number) {
    return this.httpClient.post(`${BackendUrl.PostsUrl}/${id}/dislike`, {});
  }

  create(formData) {
    return this.httpClient.post(`${BackendUrl.PostsUrl}`, formData);
  }

  update(id: number, formData) {
    return this.httpClient.post(`${BackendUrl.PostsUrl}/${id}`, formData);
  }

  destroy(post: Post) {
    return this.httpClient.delete(`${BackendUrl.PostsUrl}/${post.id}`);
  }

  report(data: { reason: string; post_id: number }) {
    return this.httpClient.post(BackendUrl.ReportsUrl, data);
  }
}
