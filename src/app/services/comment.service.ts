import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendUrl } from './backendUrl';

import { catchError } from 'rxjs/operators';
import { PostService } from './post.service';
import { Comment } from '../shared/Comment';

@Injectable()
export class CommentService {
  constructor(private httpClient: HttpClient, private postService: PostService) {}

  like(id) {
    return this.httpClient.post(`${BackendUrl.CommentsUrl}/${id}/like`, {});
  }

  unlike(id) {
    return this.httpClient.post(`${BackendUrl.CommentsUrl}/${id}/dislike`, {});
  }

  create(data) {
    return this.httpClient.post(`${BackendUrl.CommentsUrl}`, data).subscribe(res => {
      this.postService.find(data.post_id);
    });
  }

  update(comment: Comment) {
    return this.httpClient.put(`${BackendUrl.CommentsUrl}/${comment.id}`, { body: comment.body }).subscribe(res => {
      this.postService.find(comment.post_id);
    });
  }

  destroy(comment: Comment) {
    return this.httpClient.delete(`${BackendUrl.CommentsUrl}/${comment.id}`).subscribe(res => {
      this.postService.find(comment.post_id);
    });
  }
}
