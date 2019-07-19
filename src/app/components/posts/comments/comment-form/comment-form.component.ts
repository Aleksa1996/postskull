import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../../shared/Post';
import { CommentService } from '../../../../services/comment.service';
import { PostService } from '../../../../services/post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() post: Post = null;
  constructor(private commentService: CommentService) {}

  ngOnInit() {}

  addComment(form: NgForm) {
    if (form.invalid) return;
    const { value } = form;
    this.commentService.create({ body: value.body, post_id: this.post.id });
    form.reset();
  }
}
