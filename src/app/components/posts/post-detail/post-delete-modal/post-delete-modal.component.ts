import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from '../../../../shared/Post';
import { PostService } from '../../../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-delete-modal',
  templateUrl: './post-delete-modal.component.html',
  styleUrls: ['./post-delete-modal.component.scss']
})
export class PostDeleteModalComponent implements OnInit {
  @Input() post: Post;
  constructor(private postService: PostService, public activeModal: NgbActiveModal, public router: Router) {}

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }

  deletePost() {
    this.postService.destroy(this.post).subscribe(res => {
      this.activeModal.close();
      this.router.navigate(['/']);
    });
  }
}
