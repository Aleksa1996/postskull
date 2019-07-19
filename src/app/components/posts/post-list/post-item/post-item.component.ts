import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../../../../shared/Post';
import { AuthService } from '../../../../services/auth.service';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  public postCopyText: string = '';
  constructor(public authService: AuthService, private postService: PostService) {}

  ngOnInit() {
    this.postCopyText = window.location.hostname + '/post/' + this.post.id;
  }

  copyToClipboard(input) {
    input.select();
    document.execCommand('copy');
  }

  like() {
    this.postService.like(this.post.id).subscribe(res => {
      this.post.likes++;
      this.post.liked = true;
    });
  }

  unlike() {
    this.postService.unlike(this.post.id).subscribe(res => {
      this.post.likes--;
      this.post.liked = false;
    });
  }
}
